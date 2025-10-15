# Chapter 7

本章介紹多種非同步風格：Callbacks、Promises、Async/Await 的實作。

## 檔案結構與腳本

- `data/`：測試檔案
- `1-callbacks.js`：Error-first Callback 範例
- `2-promises.js`：Promise 與 `Promise.allSettled`
- `3-async-await.js`：Async/Await with try/catch
- `4-streams.js`：Node Streams `pipeline()` + Transform
- `5-concurrency.js`：Node.js 併行範例
- `6-error-bubbles.js`：錯誤處理

* 範例 4~6 為補充範例（進階），不在本書範圍。

## 快速開始

```bash
cd chapter-07
npm start              # 跑 callbacks 版
npm run promises       # 跑 Promise 版
npm run await          # 跑 async/await 版
npm run streams        # 跑 streams 範例（輸出到 dist/out.txt）
npm run concur         # 跑 Concurrency 併行範例
npm run errors         # 錯誤處理範例
```
