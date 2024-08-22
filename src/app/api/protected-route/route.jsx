import jwt from 'jsonwebtoken';

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Authorization token missing or invalid', { status: 401 });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    // Fetch protected data here or use decoded token info
    const protectedData = { message: 'This is protected data.', user: decoded };
    
    return new Response(JSON.stringify(protectedData), { status: 200 });
  } catch (error) {
    return new Response('Invalid token', { status: 403 });
  }
}
