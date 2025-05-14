"use client"
import { useEffect, useState } from "react";
import BlogCard from "./_components/BlogCard";
import TopBlogCard from "./_components/TopBlogCard";
import axios from "axios";

export default function Home() {

  const [allBlogs, setAllBlogs] = useState([]);
  const [topBlogs, setTopBlogs] = useState([]);

  async function getAllBlogs(){
    const response = await axios.get('/api/blogs');
    if(response){
      setAllBlogs(response.data)
      setTopBlogs(response.data.slice(0,3))
    } else{
      console.log("Error")
    }
  }

  useEffect(()=>{
    getAllBlogs()
  },[])

  console.log(allBlogs)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-8 lg:gap-x-8 w-full px-4 lg:px-20 py-4 min-h-screen">
      <div className="col-span-3">
        <p className="text-2xl font-semibold pb-5">All Blogs</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            allBlogs?.map((blog)=>(
              <BlogCard key={blog._id} id={blog._id} title={blog.title} content={blog.content} image={blog.image} author={blog.author}/>
            ))
          }
         
        </div>
      </div>
      <div className="md:col-span-2 w-full">
        <div className="w-full h-60 bg-red-100 mb-5">
          <p>advertisement</p>
        </div>
        <p className="text-2xl font-semibold pb-5">Top Blogs</p>
        <div className="space-y-4">
          {
            topBlogs?.map((blog)=>(
              <TopBlogCard key={blog._id} id={blog._id} title={blog.title} content={blog.content} image={blog.image} author={blog.author}/>
            ))
          }
          
        </div>
      </div>
    </div>
  );
}
