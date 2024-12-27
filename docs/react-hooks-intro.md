
## React Hooksについて

Reactにある便利な機能。使用する際はファイル冒頭に以下の記述が必要。
```tsx
'use client';

　　～～～
```

主に使うものを紹介する。

* **useState**

    ```tsx
    import { useState } from 'react';

    const [ 状態変数, セッター関数 ] = useState< 型 >( 初期値 );
    ```
    変数を管理するHooksであり、セッター関数を使用して状態を設定すると、関連する要素を再レンダリングしてくれる。
    [例はこちら](https://chatgpt.com/share/676d8b9b-1ca4-800a-9a26-6e357b660a7d)

    > ※初期値で型が明らかな場合は、< 型 > はいらない。
    * 初期値が明らか
    ```tsx
    const [count, setCount] = useState(0);

    const [names, setNames] = useState(["牛乳じゃんけん全勝の田中", "写真に写ってるのに合成された佐藤"]);
    ```
    * 初期値が明らかでない
    ```tsx
    const [age, setAge] = useState< number | undefined >();

    const [names, setNames] = useState< string[] >([]);
    ```
    <br>
    セッター関数は現在の値をアロー関数の引数で取得できる。

    ```tsx
    const [names, setNames] = useState< string[] >([]);

    setNames( ["牛乳じゃんけん全勝の田中", "写真に写ってるのに合成された佐藤"] );

    setNames( (currentNames) => [ ...currentNames, "実は入学できていなかった鈴木" ] );
    ```

    <br>

* **useEffect**

    ```tsx
    import { useEffect } from 'react';

    useEffect(() => {

        // 副作用の処理

        return () => {
            // クリーンアップ処理（必要に応じて）
        };
    }, [ 依存配列 ]);
    ```
    初回レンダリング時のみ実行される。[ 依存配列 ] に設定された値が更新されるとサイド実行される。[例はこちら](https://chatgpt.com/share/676d9460-5a54-800a-a61a-991d6a1a8b84)

<br>

* その他

    [こちら](https://qiita.com/seira/items/f063e262b1d57d7e78b4)を参考にしたり調べたりしてね