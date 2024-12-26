# React Hooks入門

React Hooksは、関数コンポーネントで状態管理やライフサイクルの機能を使用するための機能です。

## useState

\`useState\`は、コンポーネント内で状態を管理するためのHookです。

\`\`\`tsx
import { useState } from 'react';

const [状態変数, セッター関数] = useState<型>(初期値);
\`\`\`

例：
\`\`\`tsx
const [count, setCount] = useState(0);
const [names, setNames] = useState<string[]>([]);

// セッター関数の使用
setNames(["牛乳じゃんけん全勝の田中", "写真に写ってるのに合成された佐藤"]);
setNames((currentNames) => [...currentNames, "実は入学できていなかった鈴木"]);
\`\`\`

## useEffect

\`useEffect\`は、副作用を扱うためのHookです。コンポーネントのレンダリング後に実行されます。

\`\`\`tsx
import { useEffect } from 'react';

useEffect(() => {
    // 副作用の処理
    return () => {
        // クリーンアップ処理（必要に応じて）
    };
}, [依存配列]);
\`\`\`

依存配列に指定された値が変更されると、エフェクトが再実行されます。

## その他のHooks

React には他にも多くの組み込みHooksがあります。詳細は[React公式ドキュメント](https://reactjs.org/docs/hooks-intro.html)を参照してください。

使用する際は、ファイルの先頭に \`'use client';\` を追加することを忘れないでください。
\`\`\`tsx
'use client';

import { useState, useEffect } from 'react';

// コンポーネントの実装
\`\`\`

