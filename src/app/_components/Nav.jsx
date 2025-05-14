'use client'
import { CircleSmall, ClipboardPenLine, LogIn, LogOut, Menu, ShoppingCart, UserRound, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
function Nav() {

    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();
    const [isHovered, setIsHovered] = useState(false)

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
    }

    const handleLogin = () => {
        router.push('/sign-in');
        closeMenu();
    }

    return (
        <>
            <div className='px-4 lg:px-20 py-4'>
                <div className='flex justify-between items-center border-b pb-4'>
                    <Link href={'/'}>
                        <p className='text-3xl font-semibold flex tracking-tighter'>reddot<span className='flex items-end '><CircleSmall fill='red' strokeWidth={0} /></span></p>
                    </Link>
                    <div className='flex gap-8 items-center'>
                        <div className='font-semibold lg:flex gap-8 hidden'>
                            <Link href={'/'} className='hover:text-red-500'>Home</Link>
                            <Link href={'/about'} className='hover:text-red-500'>About</Link>
                            <Link href={'/contact'} className='hover:text-red-500'>Contact</Link>
                        </div>
                        <div className='relative'>
                            <Link href={'/write-blog'}>
                                <ClipboardPenLine />
                            </Link>
                        </div>
                        <div className='hidden lg:block'>
                            {
                                isLoggedIn ?
                                    <div className='relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                        <UserRound />
                                        {
                                            isHovered &&
                                            <div className='absolute top-0 -translate-x-1/2 left-1/2 pt-10'><button className=' flex items-center gap-2 px-5 py-2 text-zinc-800 font-semibold bg-white shadow-md' onClick={logout}>Logout <LogOut color='red' size={18} strokeWidth={3} /></button></div>
                                        }
                                    </div> : <Link href={'/sign-in'} className='py-2 px-5 rounded-md bg-zinc-900 text-white font-semibold'>Login</Link>
                            }
                        </div>

                        <div>
                            <Menu color='black' className='block lg:hidden cursor-pointer' onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className='fixed inset-0 z-20'>
                    <div className="fixed inset-0 bg-black opacity-50 transition-opacity" onClick={closeMenu}></div>
                </div>
            )}

            <div className={`fixed top-0 right-0 z-30 w-80 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>

                <div className='flex justify-between items-center mb-6'>
                    <h3 className='text-xl font-bold text-zinc-800'>Menu</h3>
                    <X className='cursor-pointer' onClick={closeMenu} />
                </div>

                <nav className="flex flex-col gap-6 text-lg font-semibold">
                    <Link href='/' onClick={closeMenu}>Home</Link>
                    <Link href='/about' onClick={closeMenu}>About</Link>
                    <Link href='/contact' onClick={closeMenu}>Contact</Link>
                </nav>
                <div className='absolute bottom-2 w-full'>
                    {isLoggedIn ?
                        <button className='bg-red-500 text-white w-68 p-2 rounded-md text-lg flex justify-center items-center gap-1' onClick={handleLogout}>Logout<LogOut color='white' size={18} strokeWidth={3} /></button> :

                        <button className='bg-zinc-900 text-white w-68 p-2 rounded-md text-lg flex justify-center items-center gap-1' onClick={handleLogin}>Login<LogIn color='white' size={18} strokeWidth={3} /></button>
                    }
                </div>
            </div>
        </>
    )
}

export default Nav