import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { use } from "react";

connect();


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // check user exist or not 
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "user doest not exist" }, { status: 401 });
        }

        // if user exist check pass

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 403 });
        }

        const jwtTokenData = {
            id: user._id,
            email: reqBody.email,
        }

        const token = await jwt.sign(jwtTokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            id: user._id,
            message: "Login successful",
            success: true

        })

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}