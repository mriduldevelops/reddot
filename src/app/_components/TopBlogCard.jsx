import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function TopBlogCard({ title, author, content, id, image }) {
  return (
    <div className='shadow-md flex'>
      <div className='h-32 max-w-32 min-w-32 bg-zinc-200 grid place-items-center overflow-hidden'>
        <Image src={image} alt='image' width={100} height={100} className='w-full h-full object-cover' />
      </div>
      <div className='p-2'>
        <h4 className='text-lg font-semibold line-clamp-1'>{title}</h4>
        <p className='text-sm text-zinc-800 text-justify line-clamp-3'>{content}</p>
        <Link href={`/blog/${id}`} className='text-red-500 text-sm'>Read more</Link>
      </div>
    </div>
  )
}

export default TopBlogCard