![Snapsnap](https://user-images.githubusercontent.com/56881735/118735533-9974f800-b87b-11eb-958e-195aea3a510a.png)
# 📷  SNAP×SNAP
SNAP×SNAPはスナップ写真に文字を添えて投稿できるSNSです。

何気ない日常を切り取ったスナップ写真にコメントを添えることで、何気なく過ぎていく日常を「思い出」に変え、より良い日常に変えることがSNAP×SNAPの狙いです。

## 🌐  App URL

### **https://snapsnap.app/**

## 💻 開発環境


- Nuxt.js 2.14.12 (SSR)
- Google App Engine(Node.js) 
- Firebase 8.6.1 (Authentification/firestore/storage)
- Google Domains（独自ドメイン取得）
- Github
- VSCode(Visual Studio Code)

## :rocket: 構成図
![infrastructure](https://user-images.githubusercontent.com/56881735/119627470-3240e000-be47-11eb-87b8-d33c72f2a291.png)
- App Engine × Nuxt.js でSSR環境を実現しました。
- Authentification でユーザー認証を実装しました。
- DB機能としてFirestoreを採用しました。
- ストレージ機能としてFirestorageを採用しました。
## :package: 機能
### Signup
![Signup](https://user-images.githubusercontent.com/56881735/119607473-614b5780-be2f-11eb-9e4f-b3714c4bbec5.gif)
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


### Logout
- ログイン中の場合、上部のナビゲーションバーに「Logout」が表示されます。
- Logoutを押下すると、現在のログイン情報が消去されます。
- Logout完了時、トップページ（About)に遷移します。 


### Post
![Post](https://user-images.githubusercontent.com/56881735/119610639-82627700-be34-11eb-9630-dcdf41a4cdb2.gif)
- ログインしたユーザーは右下の「写真を投稿する」ボタンが表示されており、これをクリックすると投稿画面が表示されます。
- 画像ファイルを選択しコメントとロケーションを入力して投稿することができます。
- 画像はFirebase storageに保存され、投稿したコメント・撮影場所・投稿者・画像URL・投稿日時といった情報がFirestoreに保存されます。
- 投稿した内容は即時反映され、一覧画面の最上部に表示されます。
- 画像ファイルは5MB以下のみ投稿が可能で、ファイルサイズオーバーの場合はアラートが表示されます。
- 画像ファイルの選択はドラッグ&ドロップでも可能です。
- コメントは200文字以内のみ投稿が可能です。
- ロケーションは30文字以内のみ投稿が可能です。
- 画像・コメント・ロケーションは全て必須項目です。


### Comment
![Comment](https://user-images.githubusercontent.com/56881735/119611244-67443700-be35-11eb-944f-6a5234d5d34d.gif)
- ログインしたユーザーは各Postの下部に💬（ふきだしボタン）が表示されており、これをクリックするとコメント投稿画面（Post Detail)が表示されます。
- ログインしたユーザーは投稿に対するコメントを投稿することができます。
- 投稿すると、コメント・投稿者・投稿日時といった情報がFirestoreに保存されます。
- 投稿した内容は即時反映され、一覧画面の最上部に表示されます。
- コメントは200文字以内のみ投稿が可能です。


### Like&Delete
![Like＆Delete](https://user-images.githubusercontent.com/56881735/119617167-7da1c100-be3c-11eb-9a8f-95ed387f80de.gif)
- 自分が投稿したPostの下部に❤️（ハートボタン）が表示されており、これをクリックすると投稿をLikeできます。
- Likeするとハートが赤くなり、カウントアップされます。
- Like済みの投稿のハートボタンをもう一度クリックするとLike解除できます。
- 自分が投稿したPostの下部に🗑（ゴミ箱ボタン）が表示されており、これをクリックすると投稿が削除されます。


### Profile Edit
![Profile](https://user-images.githubusercontent.com/56881735/119609779-1af7f780-be33-11eb-90b2-db8419983c4e.gif)
- ナビゲーションバー右上のアイコンから、プロフィールページに遷移できます。
- Signup後は自己紹介文が空白になっています。
- 自アカウントの場合プロフィール編集ボタンが表示されます。
- プロフィール編集ボタンを押下するとモーダルが表示され、アイコン・名前・自己紹介文を編集できます。
- 画像選択はドラッグ&ドロップでの選択にも対応しています。




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

## 🎫 License
- [MIT](https://raw.githubusercontent.com/nitro583/snap/master/LICENSE)


## :pencil: Author
- [Github](https://github.com/nitro583)
- [Twitter](https://twitter.com/seiya_mtmt)
