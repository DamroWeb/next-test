import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://3.1.107.80:3001';

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/public/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

