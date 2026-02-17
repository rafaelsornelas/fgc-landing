import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TypebotBubble } from '@/components/fgc/TypebotBubble';
import WhatsAppButton from '@/components/fgc/WhatsAppButton';
import CookieBanner from '@/components/fgc/CookieBanner';
import LoadingScreen from '@/components/fgc/LoadingScreen';

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
  icons: {
    icon: '/logo-fgc.png',
  },
  openGraph: {
    title: 'FGC Expertise',
    description: 'Consultoria de alta performance para o seu negócio.',
    images: ['https://fgcexpertise.com.br/logo-fgc.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <LoadingScreen />

        {children}

        <WhatsAppButton />
        <CookieBanner />
        <TypebotBubble />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'FGC Expertise',
              description: 'Consultoria empresarial e financeira 360º. Diagnóstico estratégico, planejamento, gestão comercial e capacitação de equipes.',
              url: 'https://fgcexpertise.com.br',
              logo: 'https://fgcexpertise.com.br/logo-fgc.png',
              telephone: '+5531998760724',
              email: 'comercial@focogestaocorporativa.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Belo Horizonte',
                addressRegion: 'MG',
                addressCountry: 'BR',
              },
              sameAs: [
                'https://www.instagram.com/fgcexpertise',
                'https://www.facebook.com/fgcexpertise',
                'https://www.linkedin.com/company/105539965',
              ],
              priceRange: '$$',
            }),
          }}
        />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-JCH294WZL4" />

        {/* Microsoft Clarity */}
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