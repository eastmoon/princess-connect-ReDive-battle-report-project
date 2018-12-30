# Princess Connect Re:Dive Battle Report Project

此專案基底為 Node.js 主從應用程式，其伺服器端使用 express.js 而客戶端使用 react.js。

應用於公主連結 Re:Dive (Princess Connect Re:Dive)，對戰報表記錄系統。

## § Library

此專案包括以下函式庫：

專案環境
* [Node.js](https://nodejs.org/en/), at latest version 8.10.0.
* [Yarn for package management](https://yarnpkg.com/lang/en/)

專案語言規範：
* [ECMAScript 6.0 / Babel](https://babeljs.io/learn-es2015/)

專案後端 (server)
* [Socket.io](https://socket.io/)
* [Express.js](http://expressjs.com/)

專案前端 (client)
* [Webpack](https://webpack.js.org/)

前端主框架
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux)

單元測試框架
* [Macho](https://mochajs.org/)

## § Install project library

在安裝此專案前，必須安裝至少 Node.js version 8。

確定安裝後在執行下列命令完成套件安裝。

```
yarn install
```

## § Execute project command

應用程式啟動，原則上會經過兩道手續
+ 編譯前端頁面
+ 設定並啟動後端伺服器

### 開發模式

開發模式會以 nodemon 監控應用程式原始碼區域；當觀察到程式變動便會重新執行應用程式啟動流程。

```
yarn dev
```
> 此命令，適用於前後台主機同時修改

```
yarn client.dev
```
> 此命令，僅啟動前台開發主機

### 產品模式

產品模式執行單次應用程式啟動流程，並且以 production 設定對程式輸出進行編譯。

```
yarn start [options]
```

| 參數名稱 | 數值 | 預設值 | 說明 |
| :--: | :-: | :-: | :-----: |
| database | "path/file.json" | "" | 指向外部資料庫，其目錄需為完整路徑。 |
> 參數使用範例 ```yarn start --database=disk:/path/db.json```

### 單元測試

```
yarn test
```
