import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BlogCard({title, author, content, id, image}) {
  return (
    <div className='shadow-md'>
        <div className='h-32 bg-zinc-200 overflow-hidden grid place-items-center'>
          <Image src={image} alt='image' width={100} height={100} className='w-full h-full object-cover'/>
        </div>
        <div className='p-2'>
            <h4 className='text-lg font-semibold'>{title}</h4>
            <p className='text-sm text-zinc-800 text-justify line-clamp-4'>{content}</p>
            <Link href={`/blog/${id}`} className='text-red-500 text-sm'>Read more</Link>
        </div>
    </div>
  )
} 

export default BlogCard