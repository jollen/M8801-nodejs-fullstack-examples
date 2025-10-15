(function(){
  let API_BASE = document.getElementById('apiBase').value;
  const $out = $('#out');
  const $errors = $('#errors');
  const $status = $('#status');
  let timer = null;

  function setApiBase() {
    API_BASE = $('#apiBase').val().trim().replace(/\/$/, '');
    info('API_BASE 設為 ' + API_BASE);
  }

  function info(msg){ $status.text(msg); setTimeout(()=> $status.text(''), 1500); }
  function showError(err){
    $errors.prop('hidden', false).text('[Error] ' + (err?.message || err || 'unknown'));
    setTimeout(()=> $errors.prop('hidden', true).text(''), 3500);
  }

  // naive retry with backoff: tries = 3
  async function ajaxWithRetry(opts, tries=3, backoff=300){
    for (let i=0;i<tries;i++){
      try {
        const data = await $.ajax(opts);
        return data;
      } catch (e){
        if (i === tries-1) throw e;
        await new Promise(r => setTimeout(r, backoff * (i+1)));
      }
    }
  }

  async function createOne(message){
    const optimistic = { id: '…', message, timestamp: Date.now() };
    renderJSON([optimistic], true);

    const data = await ajaxWithRetry({
      url: API_BASE + '/discussions',
      method: 'POST',
      data: JSON.stringify({ message }),
      contentType: 'application/json',
      dataType: 'json'
    });
    info('已建立 #' + data.id);
    await loadLatest(8, false); // refresh real data
  }

  function renderJSON(list, prepend=false){
    try {
      const current = $out.text().trim();
      if (prepend && current) {
        const parsed = JSON.parse(current);
        const merged = [...list, ...parsed];
        $out.text(JSON.stringify(merged, null, 2));
      } else {
        $out.text(JSON.stringify(list, null, 2));
      }
    } catch {
      $out.text(JSON.stringify(list, null, 2));
    }
  }

  async function loadLatest(n, asText){
    const url = API_BASE + '/discussions?limit=' + n + (asText ? '&format=txt' : '');
    try {
      if (asText){
        const data = await $.ajax({ url, method:'GET', headers: { 'Accept': 'text/plain' }, dataType: 'text' });
        $out.text(data);
      } else {
        const data = await $.ajax({ url, method:'GET', headers: { 'Accept': 'application/json' }, dataType: 'json' });
        renderJSON(data, false);
      }
      info('已載入最新 ' + n + ' 筆');
    } catch(e){
      showError(e?.responseJSON?.detail || e?.statusText || e?.message);
    }
  }

  // wire up
  $('#applyBase').on('click', setApiBase);
  $('#send').on('click', async () => {
    try {
      const v = $('#msg').val().trim();
      if (!v) return;
      $('#msg').val('');
      await createOne(v);
    } catch(e){ showError(e?.responseJSON?.detail || e?.statusText || e?.message); }
  });
  $('#loadJson').on('click', () => loadLatest(8, false));
  $('#loadText').on('click', () => loadLatest(8, true));

  $('#autoRefresh').on('change', function(){
    if (this.checked){
      timer = setInterval(() => loadLatest(8, false).catch(()=>{}), 5000);
    } else {
      if (timer) clearInterval(timer);
      timer = null;
    }
  });

  // initial
  setApiBase();
  loadLatest(5, false).catch(()=>{});
})();
