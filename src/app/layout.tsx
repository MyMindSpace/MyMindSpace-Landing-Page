import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument'
})

export const metadata: Metadata = {
  title: 'MyMindSpace - Your Mind, Unfolded',
  description: 'An AI-powered mental wellness companion.',
}

import SmoothScroll from '@/components/SmoothScroll'
import GrainOverlay from '@/components/GrainOverlay'
import CustomCursor from '@/components/CustomCursor'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased cursor-none`}>
        <SmoothScroll />
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
