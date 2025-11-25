import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERIES_JSON_PATH = path.join(process.cwd(), 'public', 'galleries.json');

export async function GET() {
  try {
    const data = fs.readFileSync(GALLERIES_JSON_PATH, 'utf-8');
    const galleries = JSON.parse(data);
    return NextResponse.json(galleries);
  } catch (error) {
    console.error('Error reading galleries:', error);
    return NextResponse.json(
      { error: 'Failed to read galleries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = fs.readFileSync(GALLERIES_JSON_PATH, 'utf-8');
    const galleries = JSON.parse(data);

    // Update galleries JSON with new data
    fs.writeFileSync(GALLERIES_JSON_PATH, JSON.stringify(galleries, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating galleries:', error);
    return NextResponse.json(
      { error: 'Failed to update galleries' },
      { status: 500 }
    );
  }
}
