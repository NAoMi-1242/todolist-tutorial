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

## TailWind CSSについて

HTMLタグに簡単に直接CSSを当てることができる。[詳しくは検索してね](https://www.google.com/search?q=tailwind+css+%E8%A7%A3%E8%AA%AC&sca_esv=4d6ae7d55c35ef9b&sxsrf=ADLYWIIGkLg3eDFeRMYxCFRweykBVfo4OQ%3A1735154501049&ei=RVtsZ87bAt7d2roP5t61uAg&oq=TailWind%E3%80%80CSS%E3%80%80%E8%A7%A3%E8%AA%AC&gs_lp=Egxnd3Mtd2l6LXNlcnAiF1RhaWxXaW5k44CAQ1NT44CA6Kej6KqsKgIIADIEEAAYHjIFEAAY7wUyCBAAGIAEGKIEMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESNUNUDZYNnABeAGQAQCYAWegAWeqAQMwLjG4AQHIAQD4AQGYAgKgAm_CAgoQABiwAxjWBBhHmAMAiAYBkAYKkgcDMS4xoAegAg&sclient=gws-wiz-serp)

* 通常の場合

    **styles.module.css**
    ```css
    header {
        display: flex;
        justify-content: center;
        padding: 10px;
        background-color: rgb(226, 226, 226);
    }
    ```
    **page.tsx**
    ```tsx
    import styles from "./styles.module.css";

    export default function HomePage() {
      return (
        <header 
            className={styles.header}
        >
            TODO APP
        </header>
      );
    }
    ```
<br>

* TailWind CSSの場合

    **page.tsx**
    ```tsx
    export default function HomePage() {
      return (
        <header
            className="flex justify-center p-10 bg-[rgb(226,226,226)]"
        >
            TODO APP
        </header>
      );
    }
    ```

## 既存ファイルについて

### 1. favicon.ico
画像ファイルを設定することによって、サイトのアイコンを設定できる。

![icon-setting](https://github.com/user-attachments/assets/20d67542-38e7-4adb-9424-a757c414361f)

[元画像(いらすとや)](https://www.irasutoya.com/2021/01/luffy.html)

### 2. globals.css
全体のスタイルを管理するCSSファイルです。以下の３行はTailWind CSSを適応するのに必要だから消さないで。
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. layout.tsx
globals.cssを読み込む必要がある。

```tsx
import "./globals.css";
```

全ページで共通している要素を記述する。
* メタデータ

    「1. favicon.ico」の画像のような「Todolist App」のようなタイトルや、検索したときに表示される説明文などを記述できる。

    ![description](https://github.com/user-attachments/assets/7642ae81-fcd4-4bb0-bc57-9adff16a9d3a)

    ```tsx
    import type { Metadata } from "next";

    export const metadata: Metadata = {
        title: "Todolist App",
        description: "Todoアプリのチュートリアルです"
    };
    ```
<br>

* ヘッダー、フッター

    ```html
    <header
        className="flex justify-center p-10 bg-[rgb(226,226,226)]"
    >
        TODO APP
    </header>


    <footer
        className="flex justify-center p-10 bg-[rgb(199,199,199)]"
    >
        <a
            href={"https://claude.ai/"}
            className="hover:text-blue-500 underline"
        >
            困ったときはClaude
        </a>
    </footer>
    ```

    ![header-footer](https://github.com/user-attachments/assets/c81d467a-d4f3-47dc-8b47-4b7cc5ab5f84)

* children

    これから作成するページ(page.tsx)がこのchildrenに格納されているので、それを表示することによって全ページでヘッダーとフッターを共通にできる。

    ```tsx
    export default function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
        return (
            <html lang="jp">
                <body>
                    // header


                    <main>
                        {children}
                    </main>


                    // footer
                </body>
            </html>
        );
    }
    ```