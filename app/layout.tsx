import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
 
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import ClientOnly from './components/ClientsOnly'
import SearchModal from './components/modals/SearchModal'

const nunito= Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
        <ToasterProvider/>
        <SearchModal/>
        <LoginModal/>
        <RentModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser} />
        </ClientOnly>
    <div className='pb-20 pt-28'>
    {children}
    </div>
        </body>
    </html>
  )
}
