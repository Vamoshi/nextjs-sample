import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css'
import Footer from '@/components/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: 'PropertyPulse | Find the Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties',
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}

export default MainLayout