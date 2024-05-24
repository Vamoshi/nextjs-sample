import React, { ReactNode } from 'react'

interface InfoBoxProps {
    heading: string,
    backgroundColor: string,
    textColor?: string,
    buttonInfo: { text: string, link: string, backgroundColor: string, },
    children: ReactNode
}

const InfoBox = ({
    heading,
    backgroundColor = "bg-gray-100",
    textColor = "",
    buttonInfo,
    children,
}: InfoBoxProps) => {
    return (
        <div className={`${backgroundColor || "bg-gray-100"} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {children}
            </p>
            <a
                href="/properties"
                className={`inline-block ${buttonInfo.backgroundColor || "bg-black"} text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
                {buttonInfo.text}
            </a>
        </div>)
}

export default InfoBox