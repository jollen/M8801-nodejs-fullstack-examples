# Chapter 8

本章提供一個最小可執行的 Express.js 專案，示範：

- URL Routing：主路由 `routes/index.js` 與 `routes/posts.js`
- View Engine：使用 Pug（Jade 後繼版）渲染 HTML
- Static：`public/` 靜態檔案服務
- 錯誤處理：`next(err)` 觸發錯誤中介層，集中回應（404/500）

## 快速啟動

```bash
cd chapter-08
npm install
npm start
# 瀏覽 http://localhost:3000
```

## URL Routing

- `GET /`：首頁
- `GET /posts`：列出貼文
- `POST /posts`：新增貼文（接收 JSON 或 x-www-form-urlencoded）
- `GET /healthz`：回傳 `ok` 表示 Server 已就緒（此部份未列在書中、請自行查看）
- 處理 HTTP 404：交由錯誤中介層處理
