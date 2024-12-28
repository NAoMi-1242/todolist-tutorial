# Next.js 最新ベストプラクティスガイド

## 1. Server Components と Client Components

### Server Components
- デフォルトですべてのコンポーネントはServer Componentsとして動作
- データフェッチ、データベースアクセス、バックエンドリソースへのアクセスを直接実行可能
- バンドルサイズを削減し、初期ページロードを最適化

```typescript
// app/page.tsx
async function Page() {
  const data = await fetchData() // サーバーサイドで直接データフェッチ
  return <div>{data}</div>
}
```

### Client Components
- インタラクティブな機能が必要な場合のみ使用
- ファイルの先頭に 'use client' ディレクティブを配置
- React hooksやブラウザAPIを使用する場合に必要

```typescript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## 2. データフェッチのベストプラクティス

### Server Actions
- フォーム処理やデータの変更に使用
- プログレッシブエンハンスメントをサポート
- 型安全性の確保が可能

```typescript
// app/actions.ts
'use server'

export async function submitForm(formData: FormData) {
  const data = Object.fromEntries(formData)
  // データベース処理など
}
```

### データの取得
- fetch with async components
- React Suspenseとの統合
- キャッシュとリバリデーションの活用

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: {
      revalidate: 3600 // 1時間ごとにリバリデート
    }
  })
  return res.json()
}
```

## 3. ルーティングとレイアウト

### App Router
- ファイルベースのルーティング
- 入れ子のレイアウト
- ローディングとエラー状態の処理

```typescript
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  return <article>{/* コンテンツ */}</article>
}
```

### Parallel Routes と Intercepting Routes
- 同時に複数のページを表示
- モーダルやスライドオーバーの実装に有効

```typescript
// app/@modal/(.)photos/[id]/page.tsx
// インターセプトルートの例
```

## 4. フォーム処理と状態管理

### Server Actions と Form
- useFormState による状態管理
- useOptimistic による即時UI更新
- バリデーションとエラーハンドリング

```typescript
'use client'

const [state, formAction] = useFormState(submitAction, initialState)
const [optimisticData, addOptimisticData] = useOptimistic(data, updateFn)
```

## 5. パフォーマンス最適化

### 画像最適化
- next/image の使用
- 自動的な画像最適化
- レスポンシブ画像の処理

```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  placeholder="blur"
/>
```

### ストリーミング
- Suspense を使用したコンポーネントのストリーミング
- ローディング状態の段階的な表示

```typescript
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

## 6. セキュリティとデプロイメント

### セキュリティ対策
- 環境変数の適切な管理
- CORS の設定
- CSP の実装

### デプロイメント
- Vercel との統合
- 静的エクスポートのオプション
- エッジランタイムの活用

## 7. テストとデバッグ

### テスト戦略
- Jest と React Testing Library の使用
- E2EテストにはCypress or Playwright
- コンポーネントテストの実装

### デバッグ
- React Developer Tools の活用
- サーバーサイドログの確認
- エラーバウンダリの実装

## 8. プロジェクト構成

### ディレクトリ構造
```
app/
  ├── (routes)/
  ├── components/
  ├── lib/
  ├── hooks/
  ├── utils/
  └── api/
```

### コード整理
- 共通コンポーネントの分離
- ユーティリティ関数の整理
- 型定義の管理