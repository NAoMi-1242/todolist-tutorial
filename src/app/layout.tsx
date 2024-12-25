import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todolist App",
  description: "Todoアプリのチュートリアルです"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header
          className="flex justify-center p-10 bg-[rgb(226,226,226)]"
        >
          TODO APP
        </header>

        <main>
          {children}
        </main>

        <footer
          className="flex justify-center p-10 bg-[rgb(199,199,199)] fixed bottom-0 w-full"
        >
          <a
            href={"https://claude.ai/"}
            className="text-black hover:text-blue-500 underline"
          >
            困ったときはClaude
          </a>
        </footer>
        
      </body>
    </html>
  );
}
