import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SalamonCsaba';
const GALLERIES_JSON_PATH = path.join(process.cwd(), 'public', 'galleries.json');

export async function POST(request: NextRequest) {
  try {
    const { password, galleries } = await request.json();

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (!galleries) {
      return NextResponse.json(
        { error: 'Missing galleries data' },
        { status: 400 }
      );
    }

    // Update galleries.json
    fs.writeFileSync(
      GALLERIES_JSON_PATH,
      JSON.stringify({ galleries }, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: 'Galleries updated successfully',
    });
  } catch (error) {
    console.error('Update galleries error:', error);
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}
