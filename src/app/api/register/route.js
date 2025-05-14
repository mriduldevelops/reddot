import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/user";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect()

    const { username, email, password } = await req.json();
    console.log(username, email, password)

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {

            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword)

        const user = new UserModel({ username, email, password: hashedPassword })

        console.log(user)
        await user.save()

        return NextResponse.json({ message: 'User Registered Successfully', user }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}