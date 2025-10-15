# Chapter 3

本章示範不用第三方 npm 套件，以 Node 內建 `http` 與 `url` 來實作 **Routing**（以利觀念解說）：

- 以 `METHOD + PATH` 做路由表（例如 `GET /hello`、`POST /echo`）
- 解析 `pathname` 與 `query`，支援 `GET /hello?name=Jollen`
- 提供 JSON API（`POST /echo`）與純文字回應（`GET /time`）
- 處理 HTTP 404 與 405（Method Not Allowed）

## 快速啟動

```bash
cd chapter-03
npm start
```

* 瀏覽器開啟 http://localhost:8888

## URL Routing 路徑

- `GET /`：首頁（HTML）
- `GET /hello`：`?name=xxx` → `Hello, xxx`
- `GET /time`：回傳現在的 ISO 字串（text/plain）
- `POST /echo`：回傳你送來的 JSON（`{}` 亦可）

### 範例測試

```bash
# 1) Hello
$ curl "http://localhost:8888/hello?name=Jollen"

# 2) Time
$ curl http://localhost:8888/time

# 3) Echo
$ curl -X POST http://localhost:8888/echo -H "Content-Type: application/json" -d '{"foo":"bar"}'
```
