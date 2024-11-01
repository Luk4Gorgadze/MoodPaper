'use client'
import Link from 'next/link'
import PriceCards from '../components/PriceCards'
import { useState, useContext } from 'react';
import { AuthContext } from '../components/Container';

export default function Pricing() {
    const { user } = useContext(AuthContext);
    return (
        <main className="flex flex-col justify-between text-white">
            <div className="text-lg mt-10"> <span className="font-bold text-accent">Note:</span> 1 token = 1 image</div>
            <PriceCards />
        </main>
    )
}
