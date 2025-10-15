// 前端加分：攔截表單，改用 fetch 送出，避免整頁刷新。
(function(){
  const form = document.getElementById('create');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const body = JSON.stringify({ title: fd.get('title'), body: fd.get('body') });
    const r = await fetch('/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    if (r.ok) {
      location.reload();
    } else {
      const data = await r.json().catch(()=>({}));
      alert('新增失敗：' + (data?.error?.message || r.status));
    }
  });
})();
