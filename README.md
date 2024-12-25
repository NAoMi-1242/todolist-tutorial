
```bash
function Prompt {
    "$([System.IO.Path]::GetFileName($PWD.Path))> "
}
```
# Next.jsでTodoリストアプリを作ってみよう！

## 環境構築

### 1. Node.jsのインストール

1. [Node.jsの公式サイト](https://nodejs.org/)にアクセス
2. LTS（Long Term Support）バージョンをダウンロード
3. ダウンロードしたインストーラーを実行し、指示に従ってインストール

インストールの確認:
```bash
node -v
npm -v
```

### 2. 開発環境の準備

VSCodeなどのコードエディタをインストールすることをお勧めします。
- [Visual Studio Code](https://code.visualstudio.com/)をダウンロードしてインストール

### 3. プロジェクトの作成

1. プロジェクトを作成したいディレクトリに移動
```bash
cd Desktop
```

2. Next.jsプロジェクトの作成
```bash
npx create-next-app@latest todo-app
```

3. プロジェクト作成時の質問:
```
✔ Would you like to use TypeScript? › Yes
✔ Would you like to use ESLint? › Yes
✔ Would you like to use Tailwind CSS? › Yes
✔ Would you like to use `src/` directory? › Yes
✔ Would you like to use App Router? › Yes
✔ Would you like to customize the default import alias? › No
```

4. プロジェクトディレクトリに移動
```bash
cd todo-app
```

5. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして、Next.jsの初期画面が表示されれば環境構築は完了です！

## トラブルシューティング

### Node.jsのインストールに失敗する場合
- 管理者権限で実行してみてください
- アンチウイルスソフトを一時的に無効にしてみてください

### `npm`コマンドが見つからない場合
- Node.jsを再インストールしてください
- PCの再起動を試してください

### `create-next-app`実行時にエラーが出る場合
```bash
npm cache clean --force
```
を実行してから再度試してください。
