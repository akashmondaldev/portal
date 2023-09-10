import ToasterContext from '@/context/ToasterContext'
import '../style/globals.css'
import type { Metadata } from 'next'
import GroupModal from '@/components/modal/GroupModal'

export const metadata: Metadata = {
  title: 'Sky Chat',
  description: 'Next js typescript with tailwind css and firebase message app by akash',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GroupModal/>
        <ToasterContext />
          {children}
      </body>
    </html>
  )
}
