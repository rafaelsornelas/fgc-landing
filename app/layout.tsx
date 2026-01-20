import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
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
  title: 'FGC Expertise | Consultoria Empresarial e Financeira',
  description: 'Transforme sua empresa com a FGC Expertise. Consultoria especializada em gestão financeira, processos e crescimento estratégico.',
  keywords: ['consultoria', 'finanças', 'gestão empresarial', 'Belo Horizonte'],
  openGraph: {
    title: 'FGC Expertise',
    description: 'Consultoria de alta performance para o seu negócio.',
    images: ['https://fgcexpertise.com.br/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      {/* AQUI ESTAVA O DETALHE: Adicionei as classes das fontes no body */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {children}

        {/* Google Analytics - Melhor dentro do body */}
        <GoogleAnalytics gaId="G-JCH294WZL4" />

        {/* Microsoft Clarity - Melhor dentro do body */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v4kbqjbrrx");
          `}
        </Script>
      </body>
    </html>
  )
}