# Chapter 6

使用 Node.js 內建 http 模組，展示 URL Routing 觀念：
  * `POST /messages`：新增訊息（JSON 或純文字）
  * `GET /messages?limit=10`：讀取最新 N 筆（預設 10）
  * `GET /`：內建簡易測試頁（同源 fetch 測 API）

本章範例不使用第三方 npm，以方便對解說觀念

## 啟動

```bash
cd chapter-06
npm install
npm start
```

* 以瀏覽器開啟 http://localhost:3000
* 或使用 curl 測試：

```bash
$ curl -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{ "message": "hello" }'
$ curl http://localhost:3000/messages?limit=5
```
