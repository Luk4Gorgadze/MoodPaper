'use client'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useRouter } from 'next/navigation'

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode
    item: {
        href: string
        label: string
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const TransitionLink = ({ href, children, item, ...props }: TransitionLinkProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        const body = document.querySelector('body')

        body?.classList.add('page-transition')
        await sleep(300)
        router.push(item.href)
        await sleep(300)
        body?.classList.remove('page-transition')
    }
    return (
        <Link href={href} {...props}
            onClick={handleTransition}
            className={`${pathname === item.href
                ? 'text-accent'
                : 'text-white hover:text-white'
                } font-semibold transition-colors duration-200`}>
            {children}
        </Link >
    )
}
