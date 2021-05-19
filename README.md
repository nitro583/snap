![Snapsnap](https://user-images.githubusercontent.com/56881735/118735533-9974f800-b87b-11eb-958e-195aea3a510a.png)
# 📷 SNAP×SNAP
SNAP×SNAPはスナップ写真に文字を添えて投稿できるSNSです。

何気ない日常を切り取ったスナップ写真にコメントを添えることで、何気なく過ぎていく日常を「思い出」に変え、より良い日常に変えることがSNAP×SNAPの狙いです。

## 🌐 App URL

### **https://snapxsnap.web.app/**

## 開発環境

- Nuxt.js 2.14.12 (SSR)
- Firebase 8.6.1 (Hosting/Functions/Authentification/firestore/storage)
- Github
- VSCode(Visual Studio Code)

## 機能

### Signup

- Firebase Authentificationを利用しています。
- ユーザー名・E-mail・パスワードを入力してサインアップが可能です。
- ユーザー名は10文字以内のみ登録が可能です。
- パスワードは20文字以内のみ登録が可能です。
- ユーザー名・E-mail・パスワードは必須項目です。 
- Signup時、トップページに遷移します。

### Login

- Firebase Authentificationを利用しています。
- 登録したE-mail・パスワードを入力してのログインが可能です。
- Googleアカウントでのログインが可能です。

### Post

- ログインしたユーザーは右下の「写真を投稿する」ボタンが表示されており、これをクリックすると投稿画面が表示されます。
- 画像ファイルを選択しコメントとロケーションを入力して投稿することができます。
- 画像はFirebase storageに保存され、投稿したコメント・撮影場所・投稿者・画像URL・投稿日時といった情報がFirestoreに保存されます。
- 投稿した内容は即時反映され、一覧画面の最上部に表示されます。
- 画像ファイルは5MB以下のみ投稿が可能で、ファイルサイズオーバーの場合はアラートが表示されます。
- 画像ファイルの選択はドラッグ&ドロップでも可能です。
- コメントは200文字以内のみ投稿が可能です。
- ロケーションは30文字以内のみ投稿が可能です。
- 画像・コメント・ロケーションは全て必須項目です。

###

### Logout
- ログイン中の場合、上部のナビゲーションバーに「Logout」が表示されます。
- Logoutを押下すると、現在のログイン情報が消去されます。
- Logout完了時、トップページ（About)に遷移します。 



## 🖥 Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
