# Chapter 2

這是一個可執行的小型 HTML5 範例，在 HTML5 頁面展示 LocalStorage、Geolocation、Notifications、Fetch、以及 Service Worker（離線快取）等技術，僅做為觀念教學使用。

## 快速啟動

```bash
cd chapter-02
npm install
npm start
```

* 瀏覽器開啟 http://localhost:4200

## 功能

- **LocalStorage**：寫入／讀取使用者名稱
- **Geolocation**：要求定位權限；若拒絕，使用「台北 25.04, 121.52」作為範例座標
- **Notifications**：請求通知權限並顯示通知
- **Fetch API**：呼叫同源 API
  - `GET /api/time`：回傳伺服器時間
  - `POST /api/echo`：回傳你送的 JSON
- **Service Worker**：快取靜態資源（離線可載入頁面）
- **WebSocket（可選）**：若第 4 章 ws 伺服器啟動，可一鍵測試連線

本章範例，僅做為前端教學觀念解說使用，呼叫的 API 皆由本章的極簡伺服器（server.js）提供。
