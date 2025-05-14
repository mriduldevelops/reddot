import { CircleSmall } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='px-4 lg:px-20 py-4 bg-zinc-100'>
            <div className='flex justify-center mb-4'>
                <Link href={'/'}>
                    <p className='text-3xl font-semibold flex tracking-tighter'>reddot<span className='flex items-end '><CircleSmall fill='red' strokeWidth={0} /></span></p>
                </Link>
            </div>
            <div className='flex justify-between'>
                <div>
                    <p className='text-sm font-semibold pb-2'>Useful Links</p>
                    <div className='text-sm text-zinc-800 flex gap-8'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/'}>About</Link>
                        <Link href={'/'}>Contact</Link>
                        <Link href={'/'}>Privacy Policy</Link>
                    </div>
                </div>
                <div>
                    <p className='text-sm font-semibold pb-2'>Social Media</p>
                    <div className='flex gap-8 items-center'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    )
}

export default Footer