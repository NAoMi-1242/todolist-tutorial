# TSXチュートリアル

TSX（TypeScript JSX）は、ReactコンポーネントをTypeScriptで書くための構文です。以下に、基本的なTSXの使い方と、Next.jsでの利用例を示します。

## 基本的なTSXコンポーネント

```tsx
import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

このコンポーネントは、\`name\`プロパティを受け取り、挨拶文を表示します。

## Next.jsでのTSX使用例

Next.jsのページコンポーネントでTSXを使用する例：

```tsx
import { GetServerSideProps } from 'next';
import Greeting from '../components/Greeting';

interface HomeProps {
  username: string;
}

const Home: React.FC<HomeProps> = ({ username }) => {
  return (
    <div>
      <Greeting name={username} />
      <p>Welcome to Next.js!</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // サーバーサイドでデータを取得する例
  const username = await fetchUsername();
  return { props: { username } };
};

export default Home;
```

この例では、サーバーサイドでユーザー名を取得し、それをプロパティとしてコンポーネントに渡しています。

## TSXの利点

1. 型安全性: プロパティの型チェックにより、多くのバグを事前に防ぐことができます。
2. 自動補完: IDEが適切な補完を提供し、開発効率が向上します。
3. リファクタリングの容易さ: 型情報により、大規模な変更も安全に行えます。

TSXを使用することで、より堅牢で保守性の高いReactアプリケーションを構築できます。

