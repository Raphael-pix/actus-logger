import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


export async function POST(req) {
  try {
    const body = await req.json().catch((e) => {
      console.error("Failed to parse request body:", e);
      return null;
    });

    if (!body || !body.name || !body.password || !body.conPassword || !body.role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { name, password, conPassword, role } = body;

    if (password !== conPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username:name },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username:name,
        password: hashedPassword,
        role,
      },
    });

     // Fetch all existing locations
     const allLocations = await prisma.location.findMany();

     // Assign all locations to the new user
     const userLocationRelations = allLocations.map((location) => ({
       userId: newUser.id,
       locationId: location.id,
     }));
 
     if (userLocationRelations.length > 0) {
       await prisma.userLocation.createMany({
         data: userLocationRelations,
       });
     }
     
    const response = NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create user", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
