import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });



export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Web3 Chess",
  description: "A decentralized chess game on the Base network.",
        other: {
        'fc:miniapp': JSON.stringify({
            version: 'next',
            imageUrl: 'https://github.com/base/brand-kit/blob/main/logo/TheSquare/Digital/Base_square_blue.png',
            button: {
                title: `Launch Your Chess on Base Mini App`,
                action: {
                    type: 'launch_miniapp',
                    name: 'Chess on Base',
                    url: 'https://chess-on-base-x7l8.vercel.app/',
                    splashImageUrl: 'https://github.com/base/brand-kit/blob/main/logo/TheSquare/Digital/Base_square_blue.png',
                    splashBackgroundColor: '#000000',
                },
            },
        }),
        },
    };
    }
    
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.className} bg-background-dark font-display text-white`}>
        <Providers>
          <div className="relative flex h-auto min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
