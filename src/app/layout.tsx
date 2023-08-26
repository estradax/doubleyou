import "./globals.css";

import { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
	<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
	  {children}
	</ThemeProvider>
      </body>
    </html>
  )
}
