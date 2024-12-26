## TailWind CSSについて

HTMLタグに簡単に直接CSSを当てることができるフレームワーク。[詳しくは検索してね](https://www.google.com/search?q=tailwind+css+%E8%A7%A3%E8%AA%AC&sca_esv=4d6ae7d55c35ef9b&sxsrf=ADLYWIIGkLg3eDFeRMYxCFRweykBVfo4OQ%3A1735154501049&ei=RVtsZ87bAt7d2roP5t61uAg&oq=TailWind%E3%80%80CSS%E3%80%80%E8%A7%A3%E8%AA%AC&gs_lp=Egxnd3Mtd2l6LXNlcnAiF1RhaWxXaW5k44CAQ1NT44CA6Kej6KqsKgIIADIEEAAYHjIFEAAY7wUyCBAAGIAEGKIEMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESNUNUDZYNnABeAGQAQCYAWegAWeqAQMwLjG4AQHIAQD4AQGYAgKgAm_CAgoQABiwAxjWBBhHmAMAiAYBkAYKkgcDMS4xoAegAg&sclient=gws-wiz-serp)

* 通常の場合

    **styles.module.css**
    ```css
    header {
        display: flex;
        justify-content: center;
        padding: 10px;
        background-color: rgb(226, 226, 226);
    }
    ```
    **page.tsx**
    ```tsx
    import styles from "./styles.module.css";

    export default function HomePage() {
        return (
            <header 
                className={styles.header}
            >
                TODO APP
            </header>
        );
    }
    ```
<br>

* TailWind CSSの場合

    **page.tsx**
    ```tsx
    export default function HomePage() {
      return (
        <header
            className="flex justify-center p-10 bg-[rgb(226,226,226)]"
        >
            TODO APP
        </header>
      );
    }
    ```
<br>
