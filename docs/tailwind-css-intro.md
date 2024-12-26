# Tailwind CSS入門

Tailwind CSSは、HTMLタグに直接CSSクラスを適用することで、簡単にスタイリングができるCSSフレームワークです。

## 通常のCSSとの比較

### 通常のCSS

**styles.module.css**
\`\`\`css
header {
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: rgb(226, 226, 226);
}
\`\`\`

**page.tsx**
\`\`\`tsx
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
\`\`\`

### Tailwind CSSの場合

**page.tsx**
\`\`\`tsx
export default function HomePage() {
  return (
    <header
        className="flex justify-center p-10 bg-[rgb(226,226,226)]"
    >
        TODO APP
    </header>
  );
}
\`\`\`

Tailwind CSSを使用すると、別のCSSファイルを作成せずに、直接HTMLタグにスタイルを適用できます。これにより、開発速度が向上し、コードの管理が容易になります。

詳細については、[Tailwind CSSの公式ドキュメント](https://tailwindcss.com/docs)を参照してください。

