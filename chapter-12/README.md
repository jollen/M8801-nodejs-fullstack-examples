# Chapter 12

本章以 Backbone.js 實作第 10 章 REST API（/api/v1/discussions）的 Frontend：

- **Model**：`Message`，支援 `save()`（POST）與 `fetch()`（GET 單筆）
- **Collection**：`Messages`，支援 `fetch({ data: { limit } })` 讀取最新 N 筆
- **Views**：`ComposeView`（送出訊息）、`ListView`（清單）、`ItemView`（單筆）
- **Router**：`#/list` 與 `#/compose` 兩頁（hash 路由）
- **Templates**：使用 Underscore `<% %>` 樣板

* 請先啟動 Chapter-10 的 REST 伺服器（:3000）
* 使用 Backbone 僅為教學目的（適合講解 MVC 觀念），實務應用請考慮採用其它主流框架

## 快速啟動

```bash
# 啟動 Chapter-10（REST）
cd ../chapter-10
npm install
npm start    # 伺服器位址：http://localhost:3000

# 啟動本章的靜態站台（避免 file:// CORS）
cd ../chapter-12
npm install
npm start    # 伺服器位址：http://localhost:4100
```
