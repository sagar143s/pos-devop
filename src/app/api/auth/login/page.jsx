import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Extract the Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Authorization token missing or invalid', { status: 401 });
    }
    
    // Remove "Bearer " from the token
    const token = authHeader.substring(7);
  
    // Now you can use the token for validation, e.g., decoding a JWT
    // const decodedToken = jwt.verify(token, 'your_secret_key');
    
    // Handle the rest of your login logic here
    return new Response(JSON.stringify({ message: 'Token received', token }), { status: 200 });
  }
  