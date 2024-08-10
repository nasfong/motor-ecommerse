import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from 'nextjs-toploader'
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/lib/context";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Provider from "@/lib/provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "",
  description: "",
};


export default async function RootLayout({
  children,
  params: {
    locale
  }
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string
  }
}>) {
  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen  font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <GlobalProvider>
            <Provider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <header className="flex h-16 items-center gap-4 px-4 md:px-6 border-b">
                <Navbar locale={locale} />
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <NextTopLoader
                  color="#2299DD"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                />
                {children}
              </div>
            </Provider>
          </GlobalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
