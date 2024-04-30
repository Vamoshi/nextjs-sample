import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

interface MainLayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: 'PropertyPulse | Find the Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties',
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div>MainLayout</div>
            </body>
        </html>
    )
}

export default MainLayout