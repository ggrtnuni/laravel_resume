# メモ

## コントローラ生成

./vendor/bin/sail artisan make:controller Resume\\ResumeController

## js モジュールをインポートすると lightningCSS でエラーが起きる場合の応急処置

../pkg がない、というエラーが出る。
とりあえず、下記を行えばエラーは出なくなるが、ちゃんとした解決方法は不明。

```bash
touch node_modules/lightningcss/pkg
```

## 参考サイト

- [Laravel開発で導入してほしいVSCode拡張機能 (WSLリモート接続)](<https://zenn.dev/na9/articles/23c18a0d2d8ee2>)
- [FontAwesome Sample](<https://fa-sample.com/icon/>)