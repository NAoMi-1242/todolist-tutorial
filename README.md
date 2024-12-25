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

<br/>

### 2. プロジェクトの作成

以下のコードをpowershellにコピペするとパスが短くなって見やすいよ
```bash
function Prompt {
    "$([System.IO.Path]::GetFileName($PWD.Path))> "
}
```

<br/>

1. プロジェクトを作成したいディレクトリに移動
```bash
cd 好きなとこ
```

2. Next.jsプロジェクトの作成
```bash
npx create-next-app@latest
```

3. プロジェクト作成時の質問:
```
√ What is your project named? ... todolist-tutorial
√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for `next dev`? ... No
√ Would you like to customize the import alias (`@/*` by default)? ... No
```

4. プロジェクトディレクトリに移動
```
VSCode
ファイル => フォルダを開く => todolist-tutorial
```

5. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして、Next.jsの初期画面が表示されれば環境構築は完了です！

<br>

## 既存ファイルについて

### 1. favicon.ico
画像ファイルを設定することによって、サイトのアイコンを設定できる。

![icon-setting](https://github.com/user-attachments/assets/20d67542-38e7-4adb-9424-a757c414361f)

[元画像(いらすとや)](https://www.irasutoya.com/2021/01/luffy.html)

### 2. globals.css
全体のスタイルを管理するCSSファイルです。