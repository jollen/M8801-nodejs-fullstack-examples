# Chapter 5

本章以「**Lambda → Callback → Promise → async/await**」的學習路線，示範 JavaScript 中「函數即值」的觀念。

## 快速啟動

```bash
cd chapter-05
npm start                 # 一次跑所有範例
npm run lambda            # Lambda / IIFE / Arrow / HOF
npm run callbacks         # Error-first Callback
npm run promises          # Promise 鏈與 allSettled
npm run await             # async/await：串行 vs 併行、錯誤處理
npm run curry             # Currying / Partial / Closure
npm run compose           # compose / pipe（純函式管線）
npm run control           # debounce / throttle（模擬事件）
npm run pipeline          # 函數式資料處理管線（point-free）
```

* 請注意，部份範例不在本書範圍，請參考下方解說。

## 範例用途

- `0-overview.js`：瀏覽重點摘要
- `1-lambda.js`：Lambda / IIFE / Arrow / HOF（map/filter/reduce）
- `2-callbacks.js`：Error-first callback 樣式與風險
- `3-promises.js`：Promise Chain、狀態與 `allSettled`
- `4-async-await.js`：將非同步語意同步化，示範錯誤處理
- `5-curry.js`：Currying、Partial、Closure 的語意封裝
- `6-compose.js`：`compose` / `pipe` 資料處理
- `7-control.js`：debounce / throttle 實作與行為比較
- `8-pipeline.js`：Point-free 風格的資料處理管線

* 範例 1~4 為本書範例，其中有一小部份為進階實作，不在本書範圍可忽略
* 範例 5~8 為進階技巧，不在本書寫作範圍，僅供參考：**Currying / 關閉包（Closure） / Partial Application / Functional Pipeline** 等進階技巧
