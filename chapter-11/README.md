# Chapter 11

本章是第 10 章 REST API 的前端示範，採用 jQuery 模式：

- 以 **jQuery.ajax** 存取 `/api/v1/discussions`
- JSON 送出、JSON 或 text/plain 讀回（對應內容協商）
- 失敗重試（簡易退避）、統一錯誤顯示、樂觀更新（Optimistic UI）
- 可設定 API Base（預設 `http://localhost:3000/api/v1`）

> 請先啟動 Chapter-10 的 REST 伺服器再執行本章範例。

## 快速啟動

```bash
# 先啟動 Chapter-10
cd ../chapter-10
npm install
npm start    # http://localhost:3000

# 開另一個終端機，啟動本章靜態站台
cd ../chapter-11
npm install
npm start    # http://localhost:4000
```

* 瀏覽 `http://localhost:4000`，即可用本章頁面呼叫第 10 章 API。
