# Laravel 学習用

Look at the [Laravel documentation](https://laravel.com/docs) to learn more.

## 動作確認環境

- Windows 11 Pro
- WSL2
- Ubuntu 22.04.5 LTS
- Docker version 28.0.1, build 068a01e
- Laravel 12
    - laravel.build 経由で Laravel Sail を使ってインストール


## 開発について

新規プロジェクト作成。 
PHP のバージョンを指定したい場合は `?PHP=83` のようにクエリパラメータを付ける。

```bash
curl -s https://laravel.build/(ここにプロジェクト名) | bash
```

コンテナを起動する。

```bash
./vendor/bin/sail up -d
```

Alpinejs を開発用で実行。
これをしないと Laravel + Vite + Alpinejs 環境ではページが表示されない。
Hot Module Replacement が効くので便利。

```bash
./vendor/bin/sail npm run dev
```

コンテナを停止する。

```bash
./vendor/bin/sail stop # ← コンテナ保持、イメージ保持
or
./vendor/bin/sail down # ← コンテナ削除、イメージ保持
```


## 公開について

Vite 管理下のものをビルドする。`public/build` が出来る。

```bash
./vendor/bin/sail npm run build
```

本番用 .env を作っておく。

- `APP_ENV` は `production` にしておく。
    - こうすることで Laravel Sail でセットアップされた Vite が静的なファイル `public/build` を参照するようになる。
- `APP_DEBUG` は `false` にしておく。
- `APP_URL` は本番環境に合わせた URL にしておく。
- `LOG_CHANNEL` は `daily` などログローテートされるものにしておく。

ソースを本番環境に置く。

