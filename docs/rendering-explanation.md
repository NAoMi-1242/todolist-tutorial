# Next.jsのレンダリング概要

Next.jsは、さまざまなレンダリング戦略をサポートしています。ここでは、クライアントサイドレンダリング（CSR）、サーバーサイドレンダリング（SSR）、そしてReactサーバーコンポーネント（RSC）について解説します。

## クライアントサイドレンダリング（CSR）

CSRは、ブラウザ上でJavaScriptを使用してコンテンツをレンダリングする方法です。

![Client-side Rendering](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fclient-side-rendering.png&w=1920&q=75&dpl=dpl_7ks6Dn9XxNbVLhEEgCRUCCZWvBEE)

### CSRの特徴:
- 初期ロードが遅い（大きなJSバンドルをダウンロードする必要がある）
- インタラクティブな操作が速い
- SEOに不利（初期HTMLにコンテンツがない）

### CSRの例:

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

## サーバーサイドレンダリング（SSR）

SSRは、リクエストごとにサーバー上でページのHTMLを生成する方法です。

![Server-side Rendering](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-side-rendering.png&w=1920&q=75&dpl=dpl_7ks6Dn9XxNbVLhEEgCRUCCZWvBEE)

### SSRの特徴:
- 初期ロードが速い（HTMLがすぐに表示される）
- SEOに有利（HTMLにコンテンツが含まれる）
- サーバーの負荷が高くなる可能性がある

### SSRの例:

```tsx
import { GetServerSideProps } from 'next'

export default function Page({ data }) {
  return <div>{data}</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  return { props: { data } }
}
```

## Reactサーバーコンポーネント（RSC）

RSCは、Next.js 13で導入された新しいレンダリング方式で、サーバー上でコンポーネントをレンダリングし、結果をクライアントに送信します。

![React Server Components](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-client-components.png&w=1920&q=75&dpl=dpl_7ks6Dn9XxNbVLhEEgCRUCCZWvBEE)

### RSCの特徴:
- サーバー上で実行されるため、クライアントのJavaScriptバンドルサイズを削減
- データベースやファイルシステムに直接アクセス可能
- 自動的にコード分割を行う

### RSCの例:

```tsx
// app/page.tsx
// このファイルはデフォルトでサーバーコンポーネントです

async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <main>{data}</main>
}
```

## レンダリング方式の選択

- **CSR**: ユーザーインタラクションが多い部分（フォーム、動的な更新が必要な箇所）
- **SSR**: データが頻繁に変更される、またはユーザー固有のコンテンツを表示する必要がある場合
- **RSC**: 大部分のコンポーネントで使用し、必要に応じてクライアントコンポーネントと組み合わせる

Next.js 13のApp Routerでは、デフォルトですべてのコンポーネントがRSCとなり、必要に応じて`'use client'`ディレクティブを使用してクライアントコンポーネントに切り替えることができます。これにより、パフォーマンスとSEOの最適化が容易になります。

各レンダリング方式の特性を理解し、アプリケーションの要件に応じて適切に選択することが重要です。