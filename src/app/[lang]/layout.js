import { Inter } from "next/font/google";
import "../globals.css";
import { getDictionary } from "../get-dictionary";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: '/logo-horizontal.png',
      apple: '/logo-horizontal.png',
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/logo-horizontal.png'],
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
