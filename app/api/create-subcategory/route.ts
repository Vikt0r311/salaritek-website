import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SalamonCsaba';
const GALLERIES_JSON_PATH = path.join(process.cwd(), 'public', 'galleries.json');

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-+/g, '_');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, galleryId, title } = body;

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (!galleryId || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read current galleries data
    const galleriesData = JSON.parse(
      fs.readFileSync(GALLERIES_JSON_PATH, 'utf-8')
    );

    // Find the gallery
    const gallery = galleriesData.galleries.find(
      (g: any) => g.id === galleryId
    );
    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // Create slug from title
    const slug = createSlug(title);
    const subcategoryId = slug;

    // Check if subcategory already exists
    const existingSubcategory = gallery.subcategories.find(
      (s: any) => s.id === subcategoryId
    );
    if (existingSubcategory) {
      return NextResponse.json(
        { error: 'Ez az alkategória már létezik' },
        { status: 400 }
      );
    }

    // Create new subcategory
    const newSubcategory = {
      id: subcategoryId,
      title: title,
      slug: slug,
      images: [],
    };

    gallery.subcategories.push(newSubcategory);

    // Create directory for the new subcategory
    const galeriaPath = path.join(
      process.cwd(),
      'public',
      'galeria',
      slug
    );
    if (!fs.existsSync(galeriaPath)) {
      fs.mkdirSync(galeriaPath, { recursive: true });
    }

    // Update galleries.json
    fs.writeFileSync(
      GALLERIES_JSON_PATH,
      JSON.stringify(galleriesData, null, 2)
    );

    return NextResponse.json({
      success: true,
      subcategoryId: subcategoryId,
      message: 'Alkategória sikeresen létrehozva',
    });
  } catch (error) {
    console.error('Create subcategory error:', error);
    return NextResponse.json(
      { error: 'Alkategória létrehozása sikertelen' },
      { status: 500 }
    );
  }
}
