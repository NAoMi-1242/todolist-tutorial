## 既存ファイルについて　src/app/~

* **favicon.ico**

    画像ファイルを設定することによって、サイトのアイコンを設定できる。

    ![icon-setting](https://github.com/user-attachments/assets/20d67542-38e7-4adb-9424-a757c414361f)

    [元画像(いらすとや)](https://www.irasutoya.com/2021/01/luffy.html)

* **globals.css**

    全体のスタイルを管理するCSSファイルです。以下の３行はTailWind CSSを適応するのに必要だから消さ   ないで。
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

* **layout.tsx**

    globals.cssを読み込む必要がある。

    ```tsx
    import "./globals.css";
    ```

    全ページで共通している要素を記述する。
    * メタデータ

        「1. favicon.ico」の画像のような「Todolist App」のようなタイトルや、検索したときに表示さ    れる説明文などを記述できる。

        ![description](https://github.com/user-attachments/assets/7642ae81-fcd4-4bb0-bc57-9adff16a9d3a)

        ```tsx
        import type { Metadata } from "next";

        export const metadata: Metadata = {
            title: "Todolist App",
            description: "Todoアプリのチュートリアルです"
        };
        ```

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
<br>
