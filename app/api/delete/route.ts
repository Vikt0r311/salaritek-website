import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SalamonCsaba';
const GALLERIES_JSON_PATH = path.join(process.cwd(), 'public', 'galleries.json');

export async function POST(request: NextRequest) {
  try {
    const { password, imageName, galleries } = await request.json();

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (!imageName) {
      return NextResponse.json(
        { error: 'Missing image name' },
        { status: 400 }
      );
    }

    // Delete the image file
    const imagePath = path.join(process.cwd(), 'public', 'galeria', imageName);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Update galleries.json
    fs.writeFileSync(
      GALLERIES_JSON_PATH,
      JSON.stringify({ galleries }, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}
