# calendar-from-stream-rebuild
Add a stream schedule to google calendar [rebuild]

## What is this ?
Youtube(+etc...?)の配信予定をgoogleカレンダーに追加するやつの再構築版

[もとのやつのリポジトリ](https://github.com/cffnpwr/calendar-from-stream)

## What does (framework, API, etc...) use ?
 - Google App Script
 - Youtube Data API
 - Google Calendar API

## Installation

### claspを使用する場合

#### 前提

```zsh
$ sudo npm install -g @google/clasp
$ clasp login
```

#### カレンダーIDとかURLリストとかの登録

```zsh
$ git clone https://github.com/cffnpwr/calendar-from-stream-rebuild.git
$ cd calendar-from-stream-rebuild/
$ touch .clasp.json
```

↓.clasp.json↓
```json
{
    "scriptId": "GASのスクリプトID",
    "rootDir":"src/",
    "fileExtension": "ts" 
}
```

```
$ cd src/cfsCore
$ touch .env.gs
```

↓.env.gs↓
```js
CALENDAR_ID = 配信予定を入れるGoogleカレンダーのカレンダーID;
CHANNEL_LIST = [
    配信予定を取得したいチャンネルのURLの配列
];

```

```zsh
$ clasp push
$ clasp open
```

トリガーで任意のタイミングで`main()`を実行するようにする

### 手動でGASに入れる場合

1. GASでスクリプトを作成
1. claspを使用する場合と同じように`.env.gs`作成&書き込み
1. GASのコードに`src/cfsCore/`内のファイルをすべてアップロード
2. トリガーで任意のタイミングで`main()`を実行するようにする

## Author
[twitter@yuto_o93](https://twitter.com/yuto_o93)
