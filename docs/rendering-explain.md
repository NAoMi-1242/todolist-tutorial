# Next.js Rendering Patterns Explained

## 1. Client-Side Rendering (CSR)

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: Initial Request
    Server-->>Browser: Empty HTML + JavaScript Bundle
    Note over Browser: JavaScript loads
    Note over Browser: React renders UI
    Note over Browser: Hydration complete
    Browser->>Server: Data Fetch (if needed)
    Server-->>Browser: JSON Data
    Note over Browser: UI Updates with Data
```

### CSR の特徴
- 初期ロードが遅い（JavaScript バンドルのダウンロードと実行が必要）
- SEO に不利（初期 HTML が空）
- インタラクティブな UI に適している
- サーバーの負荷が低い

## 2. Server-Side Rendering (SSR)

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: Initial Request
    Note over Server: React renders on server
    Note over Server: Data fetching
    Note over Server: HTML generation
    Server-->>Browser: Complete HTML + JavaScript
    Note over Browser: Content visible
    Note over Browser: JavaScript loads
    Note over Browser: Hydration
    Note over Browser: Interactive
```

### SSR の特徴
- 初期表示が速い（完全な HTML を受け取る）
- SEO に有利
- Time to First Byte (TTFB) が遅くなる可能性
- サーバーの負荷が高い

## 3. React Server Components (RSC) with App Router

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: Initial Request
    Note over Server: RSC renders on server
    Note over Server: Streaming HTML
    Server-->>Browser: HTML Stream Starts
    Note over Browser: Progressive rendering
    Server-->>Browser: Component Payloads
    Note over Browser: Selective Hydration
    Note over Browser: Interactive Components
```

### RSC の特徴と従来の SSR との違い

#### 1. コンポーネントレベルの最適化
- **従来の SSR**
  - ページ単位でレンダリング
  - すべてのコンポーネントが JavaScript を含む

- **RSC**
  - コンポーネント単位でサーバー/クライアントを選択可能
  - クライアントバンドルサイズの削減
  - `use client` ディレクティブによる明示的な制御

#### 2. データフェッチング
- **従来の SSR**
  - ページレベルの `getServerSideProps`
  - ウォーターフォール的なデータフェッチ

- **RSC**
  - コンポーネントレベルでの非同期データフェッチ
  - 並列データフェッチの最適化
  - サーバーサイドのみで実行される効率的なデータアクセス

#### 3. ストリーミング
- **従来の SSR**
  - ページ全体のレンダリング完了を待つ必要がある
  - TTFB が遅くなりやすい

- **RSC**
  - コンポーネント単位でのストリーミング
  - 重要なコンテンツの優先的な表示
  - Suspense による細かい制御

## 4. 実装例

### Client Component
```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### Server Component
```tsx
async function ProductList() {
  const products = await fetchProducts() // サーバーサイドのみで実行

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

### Streaming with Suspense
```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>My Shop</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  )
}
```

## 5. 選択指針

- **CSR を選ぶ場合**
  - 高度にインタラクティブな UI
  - SEO が重要でない
  - データが頻繁に更新される

- **従来の SSR を選ぶ場合**
  - SEO が重要
  - 初期表示速度が重要
  - データの更新頻度が低い

- **RSC を選ぶ場合**
  - パフォーマンスの最適化が重要
  - きめ細かいローディング制御が必要
  - バンドルサイズの削減が必要
  - マイクロフロントエンド的なアプローチ