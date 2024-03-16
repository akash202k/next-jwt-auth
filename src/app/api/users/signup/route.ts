import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";

export async function POST(req: NextRequest) {
    await connect();
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // check if user alredy exist or not 
        const user = await User.findOne({ email });
        // if user exist 
        if (user) {
            console.log("user alredy exist ");
            return NextResponse.json({ error: "user alredy exist" }, { status: 200 })
        }
        // if user is not exist already then we gonna create one 
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("salt : " + salt);
        console.log("hashedPassword : " + hashedPassword);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log("newUser : " + newUser);
        return NextResponse.json({ id: newUser._id }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}