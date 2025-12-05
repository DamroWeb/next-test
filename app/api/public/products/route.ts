import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://3.1.107.80:3001';

export async function GET() {
  try {
    const url = `${API_URL}/api/public/products`;
    console.log('Fetching from:', url);
    
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status} ${res.statusText}`, errorText);
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to fetch products', 
        details: errorMessage,
        apiUrl: API_URL 
      },
      { status: 500 }
    );
  }
}

