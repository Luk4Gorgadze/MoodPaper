'use client'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="text-white py-4 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <p className="text-center sm:text-left">&copy; 2024 LukingGood.</p>
                <nav>
                    <ul className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
                        <li><Link href="https://www.linkedin.com/in/luka-gorgadze-a926a3241/" className="hover:text-accent">Linkedin</Link></li>
                        <li><Link href="https://x.com/lukingcool" className="hover:text-accent">Twitter</Link></li>
                        <li><Link href="https://github.com/Luk4Gorgadze" className="hover:text-accent">Github</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
