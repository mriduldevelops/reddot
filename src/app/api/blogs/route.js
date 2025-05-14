import BlogModel from "@/models/blog";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import cloudinary from "@/utils/cloudinary";

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
    const image = formData.get('image');
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'blogs' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(imageBuffer);
    });

    const BlogData = {
      title: `${formData.get('title')}`,
      content: `${formData.get('content')}`,
      author: `${formData.get('author')}`,
      image: result.secure_url,
    };

    const newBlog = new BlogModel(BlogData);
    await newBlog.save();

    return NextResponse.json({ message: 'Blog created successfully', blog: newBlog }, { status: 201 });

  } catch (err) {
        console.error("POST Error:", err); 
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }

}