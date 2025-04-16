import { NextResponse } from 'next/server';

export async function middleware() {
    // Allow all requests through
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"]
}; 