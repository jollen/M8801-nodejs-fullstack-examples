# Chapter 13

本章將 Chapter-10 的 REST API 接到 MongoDB：

- 環境設定：`.env`（`MONGODB_URI`、`PORT`）
- 同源前端測試頁 `client/index.html`
- `docker-compose.yml`：MongoDB 服務（僅供參考）

## 快速啟動（本機 MongoDB）

```bash
cd chapter-13
cp .env.example .env                # 如需自訂參數
npm install
npm start                           # 預設 PORT=3001，MONGODB_URI=mongodb://localhost:27017/nochat
# 開啟 http://localhost:3001 ；API base: http://localhost:3001/api/v1
```

可執行以下指令，加入假資料到 MongoDB 以利測試：

```bash
npm run seed
```

## 快速啟動（Docker Compose 啟動 Mongo）

以下是進階內容（打包為 Docker），不在本書寫作範圍：

```bash
cd chapter-13
docker compose up -d                # 啟動 MongoDB（無帳密，開發用）
cp .env.example .env                # 內容已指向 docker 預設連線字串
npm install
npm start
```

- Docker Compose 一鍵啟動 MongoDB
- Mongoose Schema 驗證、索引與分頁查詢
- 種子資料腳本 `npm run seed`

## API 一覽（/api/v1）

- `POST /discussions` body: `{ "message": "hello" }` → 201
- `GET  /discussions?limit=10&skip=0` 讀取最新 N 筆（支援分頁）
- `GET  /healthz` 健康檢查（不在本書範圍）

使用 `Cache-Control: no-store`、`ETag`、`Last-Modified` 檔頭（不在本書範圍）。

