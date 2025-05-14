import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import UserModel from '@/models/user';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  }
}
