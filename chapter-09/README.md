# Chapter 9

本章示範中介層（**Middleware**）的實作：

- 全域中介層（請求日誌、靜態檔案、JSON 解析）
- 區域中介層（僅針對 `/secure` 區域進行密碼保護與資料前置）
- 錯誤中介層（集中處理 404 / 500）
- 回應渲染（Pug 或 JSON）

> 預設密碼為 `letmein`，可用環境變數 `APP_PASSWORD` 覆蓋。

## 快速啟動

```bash
cd chapter-09
npm install
npm start
```

# 瀏覽（無密碼保護） http://localhost:3000
# 密碼保護：http://localhost:3000/secure （密碼 letmein）
