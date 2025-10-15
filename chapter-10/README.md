# Chapter 10

本章示範 REST 與三層架構（3-Tier / SOA 思維）：

- 路由層（Router）：宣告 URL 與 HTTP 動詞
- 控制器（Controller）：解析請求、協調服務、輸出回應（內容協商）
- 服務層（Service）：商業邏輯與資料存取（此處為 in-memory，可替換 DB）
- 中介層（Middleware）：驗證輸入、CORS、錯誤處理

## 快速啟動

```bash
cd chapter-10
npm install
npm start
```

* REST API Endpoint：http://localhost:3000/api/v1
# 瀏覽器開啟：http://localhost:3000/

## API 一覽（/api/v1）

- `POST /discussions`：
  - Body(JSON)：`{ "message": "hello" }`
  - 回傳建立結果：201 Created
- `GET /discussions?limit=10&format=txt`  
  讀取最新 N 筆，支援內容協商：
  - `Accept: application/json`（預設 JSON）
  - `Accept: text/plain` 或 `?format=txt`（純文字逐行）


以下為補充範例，未列入本書寫作範圍，僅供參考：

- 伺服器狀態檢查：`/api/v1/healthz`
- 使用 `Last-Modified`、`ETag`、`Cache-Control: no-store` 等 HTTP headers（進階）
> 錯誤處理採用 `application/problem+json` 檔頭（進階）
