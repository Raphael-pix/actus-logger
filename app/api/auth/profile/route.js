import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

// GET current user profile
export async function GET(request) {
    try {
        const token = request.cookies.get('user_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { username: payload.username }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ profile: user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const token = request.cookies.get('user_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const data = await request.json();
        const { currentPassword, newPassword, newUsername } = data;

        // Get current user
        const user = await prisma.user.findUnique({
            where: { username: payload.username }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword,user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }

        // Check if new username already exists (if username is being changed)
        if (newUsername && newUsername !==user.username) {
            const existingUser = await prisma.user.findUnique({
                where: { username: newUsername }
            });
            if (existingUser) {
                return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
            }
        }

        // Updateuser
        const updatedUser = await prisma.user.update({
            where: { id:user.id },
            data: {
                ...(newUsername && { username: newUsername }),
                ...(newPassword && { password: await bcrypt.hash(newPassword, 10) })
            },
            select: { username: true, id: true }
        });

        return NextResponse.json({
            data: updatedUser,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Error updatinguser profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
} 