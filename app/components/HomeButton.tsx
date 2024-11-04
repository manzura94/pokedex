'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HomeButton = () => {
    const router = useRouter();

    return (
        <button className='self-start mb-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg' onClick={() => router.push('/')}>
            Home
        </button>
    );
};

export default HomeButton;
