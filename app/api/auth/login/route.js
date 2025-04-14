import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Create a single PrismaClient instance
const prisma = new PrismaClient();

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export async function POST(req) {
    try {
        // Parse request body
        const body = await req.json().catch(e => {
            console.error('Failed to parse request body:', e);
            return null;
        });

        if (!body || !body.username || !body.password) {
            return NextResponse.json(
                { message: "Username and password are required" },
                { status: 400 }
            );
        }

        const { username, password } = body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { username },
        }).catch(e => {
            console.error('Database query failed:', e);
            return null;
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials. Check whether username or password is correct." },
                { status: 401 }
            );
        }

        // Compare passwords
        const isValid = await bcrypt.compare(password, user.password).catch(() => {
            return NextResponse.json(
                { message: "Invalid credentials. Check whether username or password is correct." },
                { status: 401 }
            );
        });

        if (!isValid) {
            return NextResponse.json(
                { message: "Invalid credentials. Check whether username or password is correct." },
                { status: 401 }
            );
        }
        if (!user.active) {
            return NextResponse.json(
                { message: "The account is not activated. Please check in with your adminsitrator" },
                { status: 401 }
            );
        }

        // Generate token using jose
        const token = await new SignJWT({
            id: user.id,
            username: user.username
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(JWT_SECRET);

        //Update user time
        await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                updatedAt:new Date()
            }
        })

        // Create response
        const response = NextResponse.json(
            { message: "Login successful", redirectTo: '/' },
            { status: 200 }
        );

        // Set cookie with less restrictive settings for development
        response.cookies.set('user_token', token, {
            httpOnly: true,
            secure: false, // Set to false for development
            sameSite: 'lax', // Changed from 'strict' to 'lax'
            path: '/',
            maxAge: 86400 // 1 day
        });

        console.log('Setting cookie:', token);
        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: "Internal server error"},
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
} 