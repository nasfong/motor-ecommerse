import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from 'nextjs-toploader'
import Navbar from "@/components/Navbar";
import Provider from "./_provider";
import { GlobalProvider } from "@/lib/context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-neutral-50 font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}

        <Provider>
          <GlobalProvider>
            <header className="flex h-16 items-center gap-4 px-4 md:px-6">
              <Navbar />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
            </main>
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
}
