# Chapter 4

## 範例重點

- `ws` 套件（Node 最常用 WebSocket 實作）
- Broadcast
- Rooms（以 `?room=name` 加入房間）
- Heartbeat（ping/pong）偵測斷線
- 前端自動重連

## 快速啟動

```bash
cd chapter-04
npm install
npm start
```

* 伺服器 ws://localhost:8080
* 瀏覽器開啟 client/index.html 或 client/index-reconnect.html
* 指定聊天室：`ws://localhost:8080/?room=general`

## 訊息格式

* 應用層訊息以 JSON 傳遞：

```json
{ "type": "message", "room": "general", "user": "guest", "text": "hello" }
```

* 伺服器回傳系統訊息：

```json
{ "type": "system", "event": "join|leave|pong|error", "room": "general", "text": "..." }
```
