import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import BlogModel from '@/models/blog';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
  }

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blog details' }, { status: 500 });
  }
}
