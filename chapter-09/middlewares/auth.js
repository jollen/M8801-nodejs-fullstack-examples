const PASSWORD = process.env.APP_PASSWORD || 'letmein';

// 專責：顯示/處理登入表單。GET 直接顯示，POST 檢查密碼→設 cookie。
function authPrompt(req, res, next) {
  if (req.method === 'POST') {
    const pw = String(req.body.password || '').trim();
    if (!pw) return res.status(400).render('auth', { title: '登入', error: '請輸入密碼' });
    if (pw !== PASSWORD) return res.status(401).render('auth', { title: '登入', error: '密碼錯誤' });
    // 設 cookie 作為簡易登入狀態（真實專案請改用 session/JWT）
    res.cookie('auth', 'yes', { httpOnly: true, sameSite: 'lax', maxAge: 24*3600*1000 });
    return res.redirect('/secure');
  }
  // GET: 顯示表單
  res.render('auth', { title: '登入' });
}

// 專責：守門；若未登入→導去 /auth。已登入→next()
function authGate(req, res, next) {
  if (req.cookies && req.cookies.auth === 'yes') return next();
  // 允許以 query 直接測試：/secure?password=letmein
  const qpw = (req.query && req.query.password) ? String(req.query.password) : '';
  if (qpw && qpw === PASSWORD) {
    res.cookie('auth', 'yes', { httpOnly: true, sameSite: 'lax', maxAge: 24*3600*1000 });
    return res.redirect(req.baseUrl || '/secure');
  }
  // 未登入：若 JSON 請求，回 401 JSON；否則導向表單頁
  const wantsJSON = req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'));
  if (wantsJSON) return res.status(401).json({ error: { status: 401, message: 'unauthorized' } });
  res.redirect('/auth');
}

// 專責：為後續 handler 預載資料（例如 user 或設定）
function preloadUser(req, res, next) {
  // 範例：從 cookie/DB 拉資料；這裡直接假造
  req.user = { id: 1, name: 'Jollen', role: 'admin' };
  res.locals.user = req.user;
  next();
}

module.exports = { authPrompt, authGate, preloadUser };
