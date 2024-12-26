# プロジェクト構造

## 主要ファイルとディレクトリ

- **src/app/favicon.ico**: サイトのアイコンを設定できる画像ファイル。
- **src/app/globals.css**: 全体のスタイルを管理するCSSファイル。
- **src/app/layout.tsx**: 全ページで共通している要素を記述するファイル。
- **src/app/page.tsx**: メインページのコンポーネント。

## layout.tsxの構成

1. メタデータの設定
\`\`\`tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Todolist App",
    description: "Todoアプリのチュートリアルです"
};
\`\`\`

2. ヘッダーとフッターの実装
\`\`\`tsx
<header className="flex justify-center p-10 bg-[rgb(226,226,226)]">
    TODO APP
</header>

<footer className="flex justify-center p-10 bg-[rgb(199,199,199)]">
    <a href={"https://claude.ai/"} className="hover:text-blue-500 underline">
        困ったときはClaude
    </a>
</footer>
\`\`\`

3. childrenの配置
\`\`\`tsx
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="jp">
            <body>
                {/* header */}
                <main>{children}</main>
                {/* footer */}
            </body>
        </html>
    );
}
\`\`\`

この構造により、全ページで共通のレイアウトを維持しつつ、個別のページコンテンツを\`children\`として挿入できます。

