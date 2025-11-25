import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SalamonCsaba';
const GALLERIES_JSON_PATH = path.join(process.cwd(), 'public', 'galleries.json');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, galleryId, subcategoryId } = body;

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (!galleryId || !subcategoryId) {
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

    // Find the subcategory
    const subcategoryIndex = gallery.subcategories.findIndex(
      (s: any) => s.id === subcategoryId
    );
    if (subcategoryIndex === -1) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    const subcategoryToDelete = gallery.subcategories[subcategoryIndex];
    const subcategorySlug = subcategoryToDelete.slug;

    // Remove subcategory from array
    gallery.subcategories.splice(subcategoryIndex, 1);

    // Delete physical directory with all its files
    const galeriaPath = path.join(
      process.cwd(),
      'public',
      'galeria',
      subcategorySlug
    );

    if (fs.existsSync(galeriaPath)) {
      // Remove all files in the directory
      const files = fs.readdirSync(galeriaPath);
      for (const file of files) {
        const filePath = path.join(galeriaPath, file);
        fs.unlinkSync(filePath);
      }
      // Remove the directory
      fs.rmdirSync(galeriaPath);
    }

    // Update galleries.json
    fs.writeFileSync(
      GALLERIES_JSON_PATH,
      JSON.stringify(galleriesData, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: 'Alkategória sikeresen törölve',
    });
  } catch (error) {
    console.error('Delete subcategory error:', error);
    return NextResponse.json(
      { error: 'Alkategória törlése sikertelen' },
      { status: 500 }
    );
  }
}
