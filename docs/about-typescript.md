# TypeScript完全入門ガイド

## 1. TypeScriptとは

TypeScriptはMicrosoftによって開発された、JavaScriptのスーパーセット（上位互換）言語です。以下の特徴があります：

### 主な特徴
- 静的型付けによる型安全性の確保
- 最新のECMAScript機能のサポート
- IDEでの優れた開発支援（入力補完、リファクタリング）
- 大規模アプリケーション開発での信頼性向上

### TypeScriptを使うメリット
- バグの早期発見と防止
- コードの意図が明確になり、保守性が向上
- チーム開発での生産性向上
- リファクタリングの安全性確保
- 型定義ファイル（.d.ts）による外部ライブラリのサポート

## 2. 基本的な型

### プリミティブ型
```typescript
// 文字列型の基本的な使用例。変数展開が可能なテンプレートリテラルも使用可能
let name: string = "太郎"
let message: string = `こんにちは${name}さん`

// 数値型は整数、浮動小数点、2進数、16進数など、すべての数値を扱える
let age: number = 20
let decimal: number = 6.5
let hex: number = 0xf00d
let binary: number = 0b1010

// 真偽値は true/false のみを受け入れる。条件分岐でよく使用
let isStudent: boolean = true

// null と undefined はそれぞれ「値が存在しない」「値が未定義」を表す
let empty: null = null
let notDefined: undefined = undefined

// シンボルは実行時に一意の値を持つ。オブジェクトのキーなどで使用
let sym: symbol = Symbol("key")
```

### 配列とタプル
```typescript
// 配列型は同じ型の値を複数格納。T[]形式とArray<T>形式の2種類の記法がある
let numbers: number[] = [1, 2, 3]
let names: Array<string> = ["太郎", "花子"]

// タプルは異なる型の要素を持つ固定長配列。順序と型が明確に定義される
let tuple: [string, number] = ["太郎", 25]
console.log(tuple[0])  // インデックスでアクセス可能
console.log(tuple[1])  // 型の恩恵を受けられる
```

### オブジェクト
```typescript
// オブジェクトの型定義。プロパティごとに型を指定
let user: {
  name: string         // 必須のプロパティ
  age: number         // 必須のプロパティ
  email?: string      // ?を付けることでオプショナルに
  readonly id: number // readonlyで変更不可に
} = {
  name: "太郎",
  age: 20,
  id: 1
}

// インデックスシグネチャでは、動的なプロパティ名に対して型を指定できる
interface Dictionary {
  [key: string]: string  // 文字列のキーに対して文字列の値を持つ
}

let dict: Dictionary = {
  "ja": "こんにちは",
  "en": "hello"
}
```

## 2. 型エイリアスとインターフェース

### 型エイリアス（type）
```typescript
// 基本的な型エイリアス。型に別名をつけることで再利用性が高まる
type UserId = string
type Point = {
  x: number
  y: number
}

// Union型で複数の型やリテラルの組み合わせを表現できる
type Status = "loading" | "success" | "error"  // リテラル型のUnion
type NumberOrString = number | string         // プリミティブ型のUnion

// 関数の型も定義可能。コールバック関数の型としてよく使用される
type ClickHandler = (event: MouseEvent) => void

// ジェネリック型エイリアスで型引数を受け取ることができる
type Container<T> = {
  value: T            // 型引数Tを使用
  tag: string
}
```

### インターフェース（interface）
```typescript
// 基本的なインターフェース。オブジェクトの形状を定義
interface User {
  id: number    // 必須のプロパティ
  name: string  // 必須のプロパティ
  email?: string  // オプショナルなプロパティ
}

// 継承を使用して既存のインターフェースを拡張できる
interface Animal {
  name: string
}

interface Dog extends Animal {  // Animalを継承
  bark(): void                 // メソッドの定義
}

// クラスでインターフェースを実装する例
class GermanShepherd implements Dog {
  name: string                 // プロパティの実装
  constructor(name: string) {
    this.name = name
  }
  
  bark() {                     // メソッドの実装
    console.log("Woof!")
  }
}

// インターフェースは宣言のマージが可能
interface User {
  id: number
}
interface User {  // 同名のインターフェースがマージされる
  name: string
}
```

## 4. 関数の型定義

### 基本的な関数の型定義
```typescript
// 通常の関数定義。パラメータと戻り値の型を指定
function add(a: number, b: number): number {
  return a + b
}

// アロー関数での型定義。簡潔に書ける
const multiply = (a: number, b: number): number => a * b

// 関数型の変数定義。関数の型を変数に代入可能
let divide: (a: number, b: number) => number
divide = (a, b) => a / b

// オーバーロードで引数の型によって異なる戻り値の型を定義
function process(x: number): number
function process(x: string): string
function process(x: number | string): number | string {
  if (typeof x === "number") {
    return x * 2           // 数値の場合は2倍
  } else {
    return x.toUpperCase() // 文字列の場合は大文字化
  }
}
```

### オプショナルパラメータとデフォルトパラメータ
```typescript
// オプショナルパラメータは?をつけて省略可能に
function greet(name: string, title?: string): string {
  if (title) {
    return `こんにちは、${title} ${name}さん`
  }
  return `こんにちは、${name}さん`
}

// デフォルトパラメータで初期値を設定
function createUser(name: string, age: number = 20): User {
  return { name, age }  // ageが省略されたら20が使用される
}

// レストパラメータで可変長引数を受け取る
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}
```

## 5. ジェネリクス
```typescript
// 基本的なジェネリック関数。型引数Tで任意の型を受け取れる
function identity<T>(arg: T): T {
  return arg
}

// 使用例。型引数を明示的に指定するか、型推論に任せるか選択可能
let num = identity<number>(5)      // 明示的に指定
let str = identity("hello")        // 型推論で自動的に決定

// ジェネリッククラスの定義。クラス全体で型引数を使用可能
class Box<T> {
  private value: T      // プライベートな型付きプロパティ

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }
}

// ジェネリック制約。extends節で型引数に制約を付ける
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)  // lengthプロパティの存在が保証される
  return arg
}
```

### 実践的なジェネリクスの使用例
```typescript
// APIレスポンスの汎用的な型定義。どんなデータ型でも受け入れ可能
interface ApiResponse<T> {
  data: T              // レスポンスの主要データ
  status: number       // HTTPステータスコード
  message: string      // レスポンスメッセージ
}

// 具体的なデータ型を定義
interface User {
  id: number
  name: string
}

// Promise型と組み合わせたAPI関数の定義
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// keyof演算子を使用した型安全なプロパティアクセス
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]  // オブジェクトのプロパティに型安全にアクセス
}
```

## 6. クラス

### クラスの基本的な定義
```typescript
// アクセス修飾子とreadonlyを使用したクラス定義
class Person {
  private name: string        // クラス内からのみアクセス可能
  protected age: number       // 継承したクラスからもアクセス可能
  readonly id: number         // 読み取り専用プロパティ

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.id = Math.random()   // 一度設定したら変更不可
  }

  // publicメソッド（デフォルト）
  public introduce(): string {
    return `私は${this.name}、${this.age}歳です。`
  }

  // getter/setterでカプセル化を実現
  get userName(): string {
    return this.name
  }

  set userName(value: string) {
    if (value.length > 0) {   // バリデーションも可能
      this.name = value
    }
  }
}

// クラスの継承とメソッドのオーバーライド
class Employee extends Person {
  constructor(
    name: string,
    age: number,
    private department: string  // コンストラクタで直接プロパティを定義
  ) {
    super(name, age)          // 親クラスのコンストラクタを呼び出し
  }

  // メソッドのオーバーライド
  introduce(): string {
    return `${super.introduce()} ${this.department}部署です。`
  }
}
```

## 7. 型推論
TypeScriptは多くの場合、型を自動的に推論できます。
```ts
// 変数の型推論
let message = "Hello" // string型と推論
let numbers = [1, 2, 3] // number[]型と推論

// オブジェクトの型推論
let user = {
  name: "太郎",
  age: 20
} // { name: string; age: number }型と推論

// 関数の戻り値の型推論
function add(a: number, b: number) {
  return a + b  // number型と推論
}

// ジェネリックの型推論
let numbers2 = identity(1) // number型と推論
```


## 8. Union型とIntersection型
```typescript
// 基本的なUnion型。複数の型のいずれかを表現
type StringOrNumber = string | number

// オブジェクト型のUnion型。型安全な分岐処理が可能
type Success = {
  success: true      // リテラル型を使用
  data: any
}

type Failure = {
  success: false     // リテラル型を使用
  error: string
}

type Result = Success | Failure  // 成功か失敗のいずれか

// 型ガードを使用した安全な分岐
function processResult(result: Result) {
  if (result.success) {       // 型の絞り込みが行われる
    console.log(result.data)  // Success型として扱われる
  } else {
    console.log(result.error) // Failure型として扱われる
  }
}

// Intersection型で複数の型を組み合わせ
type Name = {
  firstName: string
  lastName: string
}

type Age = {
  age: number
}

// 両方の型のプロパティを持つ新しい型を作成
type Person = Name & Age

const person: Person = {
  firstName: "太郎",
  lastName: "山田",
  age: 20           // すべてのプロパティが必要
}

// インターフェースとの組み合わせ
interface Loggable {
  log(): void
}

interface Serializable {
  serialize(): string
}

// 複数のインターフェースを満たす型を作成
type LoggableAndSerializable = Loggable & Serializable
```


## 9. 分割代入とスプレッド構文

```typescript
// オブジェクトの分割代入で必要なプロパティを抽出
const user = {
  name: "太郎",
  age: 20,
  email: "taro@example.com"
}

const { name, age } = user    // プロパティを個別の変数として取り出す
console.log(name)             // 元のプロパティ名で参照可能

// プロパティ名の変更による分割代入
const { name: userName } = user  // 新しい変数名で取り出す
console.log(userName)

// 存在しないプロパティにデフォルト値を設定
const { country = "日本" } = user  // プロパティが無い場合の初期値
console.log(country)

// 配列の分割代入で要素を抽出
const numbers = [1, 2, 3, 4, 5]
const [first, second] = numbers   // 順番に取り出す
console.log(first)                // 最初の要素
console.log(second)               // 2番目の要素

// 要素のスキップと残りの要素の取得
const [, , third] = numbers       // カンマで要素をスキップ
console.log(third)                // 3番目の要素

const [head, ...tail] = numbers   // スプレッド構文で残りの要素を配列として取得
console.log(head)                 // 最初の要素
console.log(tail)                 // 残りの要素の配列
```

## 10. React/Next.jsでのTypeScript
```typescript
// Propsの型定義。必須とオプショナルを明確に区別
type ButtonProps = {
  text: string                              // 必須のプロパティ
  onClick: () => void                       // コールバック関数
  variant?: 'primary' | 'secondary'         // オプショナルなリテラル型
  disabled?: boolean                        // オプショナルなブール値
}

// 関数コンポーネントの型定義
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',    // デフォルト値の設定
  disabled = false        // デフォルト値の設定
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-${variant}`}
    >
      {text}
    </button>
  )
}

// カスタムフックの型定義
function useCounter(initialValue: number = 0) {
  // 状態と更新関数の型は自動的に推論される
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev - 1)

  return { count, increment, decrement } // 戻り値の型も推論される
}
```

### イベントハンドラの型定義
```typescript
// マウスイベントの型定義。ジェネリクスで要素を特定
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.currentTarget.value)  // 型安全なプロパティアクセス
}

// 入力イベントの型定義
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)         // 入力値を型安全に取得
}

// フォーム送信イベントの型定義
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()                   // イベントのデフォルト動作を防ぐ
  // フォーム送信の処理
}
```

### 型アサーション
```typescript
// HTMLElement型から特定の要素型へのアサーション
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement

// 別の記法（JSXと混同する可能性があるため、asを推奨）
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas")

// 型アサーションの連鎖（unknown経由）
const value = "123" as unknown as number   // 非推奨だが必要な場合もある
```

### リテラル型の活用
   ```typescript
   type Direction = "up" | "down" | "left" | "right"
   type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
   ```

### 型ガードの使用
   ```typescript
   function isString(value: unknown): value is string {
     return typeof value === "string"
   }
   ```