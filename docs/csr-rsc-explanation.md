# クライアントサイドレンダリング（CSR）とReactサーバーコンポーネント（RSC）の解説

## クライアントサイドレンダリング（CSR）

クライアントサイドレンダリング（CSR）は、Reactアプリケーションの従来の動作方式です。

### CSRの仕組み

1. ブラウザがHTMLファイルをロードする
2. JavaScriptファイル（Reactアプリケーション）がロードされる
3. Reactがブラウザ上でコンポーネントをレンダリングする
4. ユーザーが操作可能な状態になる

### CSRの例

\`\`\`tsx
'use client'

import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default Counter
\`\`\`

### CSRの特徴

- 初期ロードが遅い（JavaScriptのダウンロードと実行が必要）
- インタラクティブな操作が速い
- SEOに不利（初期HTMLにコンテンツがない）

## Reactサーバーコンポーネント（RSC）

Reactサーバーコンポーネント（RSC）は、Next.js 13のApp Routerで導入された新しい機能です。

### RSCの仕組み

1. サーバー上でReactコンポーネントがレンダリングされる
2. レンダリング結果がHTMLとしてクライアントに送信される
3. クライアント側でハイドレーションが行われ、インタラクティブになる

### RSCの例

\`\`\`tsx
// このファイルはデフォルトでサーバーコンポーネントです
import { fetchUser } from '../lib/api'

const UserProfile = async ({ userId }) => {
  const user = await fetchUser(userId)

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default UserProfile
\`\`\`

### RSCの特徴

- 初期ロードが速い（サーバーでレンダリングされたHTMLが即座に表示される）
- データフェッチがサーバー側で行われるため、クライアントのネットワーク負荷が減少
- SEOに有利（初期HTMLにコンテンツが含まれる）
- 一部の操作で再レンダリングが必要になる場合がある

## CSRとRSCの使い分け

- CSR: ユーザーインタラクションが多い部分（フォーム、アニメーションなど）
- RSC: データ表示が主な部分、SEOが重要な部分

Next.js 13のApp Routerでは、デフォルトですべてのコンポーネントがRSCとなり、必要に応じて\`'use client'\`ディレクティブを使用してCSRに切り替えることができます。これにより、パフォーマンスとSEOの最適化が容易になります。

