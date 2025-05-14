import UserModel from '@/models/user';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from 'next/server';

export async function POST(req, res) {

    await dbConnect()

    const { email, password } = await req.json();
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 400 });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        )

        return NextResponse.json({ message: 'User logged in successfully', token }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}