import BlogModel from "@/models/blog";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';

export async function GET() {
    try {
        await dbConnect();

        const blogs = await BlogModel.find()
            .sort({ createdAt: -1 })
        // .populate('author', 'username');

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error('Fetch blogs error:', error); // Log the actual error
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}


export async function POST(req) {
    await dbConnect();
    // const { title, content, image, author } = await req.json();
    // console.log({ title, content, image, author })
    try {
        const formData = await req.formData();
        console.log(formData)
        const timestamp = Date.now();
        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);
        const imgUrl = `/${timestamp}_${image.name}`;

        const BlogData = {
            title: `${formData.get('title')}`,
            content: `${formData.get('content')}`,
            author: `${formData.get('author')}`,
            image: `${imgUrl}`
        }

        console.log({ ...BlogData });
        // return NextResponse.json({...BlogData});
        const newBlog = new BlogModel({ ...BlogData });
        console.log(newBlog)
        await newBlog.save();

        // await BlogModel.create(BlogData);
        return NextResponse.json({ message: 'Blog created successfully', blog: newBlog }, { status: 201 });
    } catch (err) {
        console.error("POST Error:", err); 
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }

}