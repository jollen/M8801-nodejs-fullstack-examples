(function(){
  // ---- LocalStorage ----
  const $ = (id) => document.getElementById(id);
  $('saveName').onclick = () => {
    const v = $('name').value.trim();
    localStorage.setItem('username', v);
    $('nameOut').textContent = '已儲存為：' + v;
  };
  $('loadName').onclick = () => {
    $('nameOut').textContent = '讀到：' + (localStorage.getItem('username') || '(空)');
  };

  // ---- Geolocation with fallback ----
  $('locate').onclick = () => {
    if (!('geolocation' in navigator)) {
      $('geoOut').textContent = '此瀏覽器不支援 Geolocation';
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      $('geoOut').textContent = `座標：${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }, (err) => {
      // fallback：台北
      $('geoOut').textContent = `未授權或失敗，改用台北示例：25.04000, 121.52000`;
    }, { enableHighAccuracy: false, timeout: 5000 });
  };

  // ---- Notifications ----
  $('notify').onclick = async () => {
    if (!('Notification' in window)) {
      alert('此瀏覽器不支援 Notifications');
      return;
    }
    let perm = Notification.permission;
    if (perm !== 'granted') {
      perm = await Notification.requestPermission();
    }
    if (perm === 'granted') {
      new Notification('Hello from Chapter 2', { body: '這是一則測試通知。' });
    } else {
      alert('未取得通知權限');
    }
  };

  // ---- Fetch ----
  $('getTime').onclick = async () => {
    const r = await fetch('/api/time');
    const j = await r.json();
    $('fetchOut').textContent = JSON.stringify(j, null, 2);
  };
  $('postEcho').onclick = async () => {
    const r = await fetch('/api/echo', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ hello: 'world', at: Date.now() }) });
    const j = await r.json();
    $('fetchOut').textContent = JSON.stringify(j, null, 2);
  };

  // ---- Service Worker ----
  const swPath = '/sw.js';
  $('registerSW').onclick = async () => {
    if (!('serviceWorker' in navigator)) {
      $('swOut').textContent = '此瀏覽器不支援 Service Worker';
      return;
    }
    try {
      const reg = await navigator.serviceWorker.register(swPath);
      $('swOut').textContent = 'SW 註冊成功：' + (reg.scope || '');
    } catch (e) {
      $('swOut').textContent = 'SW 註冊失敗：' + e.message;
    }
  };
  $('unregisterSW').onclick = async () => {
    if (!('serviceWorker' in navigator)) return;
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const reg of regs) await reg.unregister();
    $('swOut').textContent = 'SW 已解除註冊';
  };

  // ---- WebSocket (optional; needs Chapter-04) ----
  let ws;
  $('wsConnect').onclick = () => {
    try {
      ws = new WebSocket('ws://localhost:8080/?room=general');
      ws.onopen = () => $('wsOut').textContent = '已連線（general 房間）\n';
      ws.onmessage = (evt) => $('wsOut').textContent += '← ' + evt.data + '\n';
      ws.onerror = () => $('wsOut').textContent += '[錯誤]\n';
      ws.onclose = () => $('wsOut').textContent += '[關閉]\n';
    } catch (e) {
      $('wsOut').textContent = '連線失敗：' + e.message + '\n';
    }
  };
  $('wsSend').onclick = () => {
    const text = $('wsText').value.trim();
    if (!text || !ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type:'message', room:'general', user:'runtime', text }));
    $('wsText').value = '';
  };
})();
