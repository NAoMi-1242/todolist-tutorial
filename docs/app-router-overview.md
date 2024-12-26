# App Router概要

Next.jsのApp Routerは、ファイルシステムベースのルーティングを提供します。

## ファイル構造とルーティング

例えば、以下のようなファイル構造の場合：

\`\`\`
/
├─ src📁
│  └─ app📁
│     ├─ favicon.ico
│     ├─ globals.css
│     ├─ layout.tsx
│     ├─ page.tsx           //1️⃣
│     ├─ help📁
│     │  └─ page.tsx        //2️⃣
│     └─ tasks📁
│        └─ [title]📁
│           └─ page.tsx     //3️⃣
└─ 設定ファイルなど
\`\`\`

1️⃣ \`http://localhost:3000/\` でアクセス可能
2️⃣ \`http://localhost:3000/help\` でアクセス可能
3️⃣ \`http://localhost:3000/tasks/~\` (例: C演習のレポート) でアクセス可能

## 動的ルーティング

\`[title]\`のような動的セグメントを使用すると、URLパラメータを受け取ることができます。

\`\`\`tsx
type Params = {
    params: { title: string }
    searchParams: { [query: string]: string | string[] | undefined }
}

const Task = async ({ params, searchParams }: Params) => {
    const { title } = await params;
    const { example } = await searchParams;

    return (
        <div>
            <h1>{`タスク： ${decodeURIComponent(title)}`}</h1>
            {example && <p>{`メッセージ： ${decodeURIComponent(example)}`}</p>}
        </div>
    )    
}

export default Task;
\`\`\`

このコンポーネントは、URLパラメータとクエリパラメータの両方を処理できます。

注意: Next.js 15からparamsの処理が非同期になったため、await/asyncを使用する必要があります。

