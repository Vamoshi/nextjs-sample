'use client'
import React from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
    loading: boolean,
    size?: number
}

const override = {
    display: 'block',
    margin: '100px auto'
}

const Spinner = ({ loading, size = 150 }: Props) => {
    return (

        <ClipLoader
            color='#3b82f6'
            loading={loading}
            cssOverride={override}
            size={size}
            aria-label='Loading Spinner'
        />
    )
}

export default Spinner