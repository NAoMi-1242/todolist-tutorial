## App Routerについて
例えば以下のようなフォルダ構成のとき、、、
```
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
```
[created by Dir Maker](https://dir-maker.netlify.app)

* 1️⃣

    [localhost:3000/](http://localhost:3000) でアクセスすることができる。

* 2️⃣

    [localhost:3000/help](http://localhost:3000/help) でアクセスすることができる。

* 3️⃣

    [localhost:3000/tasks/~ (ex: C演習のレポート )]() でアクセスすることができる。これは動的なルーティングで、このpage.tsxでパラメータとして「C演習のレポート」を受け取ることができる．

    - params の title は [title] と合わせないと動かない
    - ( ?example=これで落単とか洒落にならん ) でクエリ指定可能
    > <span style="color:red;">**Next.js 15からparamsの処理が非同期になったのでawait/asyncを使用する。[詳しくはこちら](https://qiita.com/RyuNo-13/items/751511de8b498eeb4a8b)**
    ```tsx
    type Params = {
        params: { title: string }
        searchParams: { [query: string]: string | string[] | undefined }
    }

    const Task = async ({ params, searchParams }: Params) => {
        const { title } = await params;
        const { example } = await searchParams;

        return (
            <div>
                <h1>
                    {`タスク： ${decodeURIComponent(title)}`}
                </h1>
                {example && <p>{`メッセージ： ${decodeURIComponent(example)}`}</p>}
            </div>
        )    
    }

    export default Task;
    ```

    [localhost:3000/tasks/C演習のレポート]()
    ```
    タスク： C演習のレポート
    ```
    [localhost:3000/tasks/C演習のレポート?example=これで落単とか洒落にならん]()
    ```
    タスク： C演習のレポート
    メッセージ： これで落単とか洒落にならん
    ```
    [localhost:3000/tasks/食パン買う]()
    ```
    タスク： 食パン買う
    ```
<br>
