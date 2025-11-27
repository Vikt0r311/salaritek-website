import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(
  process.env.RESEND_API_KEY || 're_53xwVrwm_EWX1rFkrYJvQ1A75wSwZ69sN'
);

interface ContactFormData {
  nev: string;
  email: string;
  telefon: string;
  szolgaltatas?: string;
  uzenet: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    const { nev, email, telefon, szolgaltatas, uzenet } = body;

    // Validate required fields
    if (!nev || !email || !telefon || !uzenet) {
      return NextResponse.json(
        { error: 'Hiányzó kötelező mezők' },
        { status: 400 }
      );
    }

    // Email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Salarkitek <info@salarkitek.hu>',
      to: 'szilakviktor@gmail.com',
      replyTo: email,
      subject: `Új kapcsolati üzenet: ${nev}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #003366;">Új üzenet a kapcsolati űrlapról</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Név:</strong> ${escapeHtml(nev)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(telefon)}</p>
            ${
              szolgaltatas
                ? `<p><strong>Érdeklődés tárgya:</strong> ${escapeHtml(szolgaltatas)}</p>`
                : ''
            }
            <p><strong>Üzenet:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FF9500;">
              ${escapeHtml(uzenet)}
            </p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Ez egy automatikus üzenet a salarkitek.hu kapcsolati úrlapjáról.
          </p>
        </div>
      `,
    });

    if (adminEmailResult.error) {
      console.error('Admin email error:', adminEmailResult.error);
      return NextResponse.json(
        { error: 'Hiba az email küldésekor' },
        { status: 500 }
      );
    }

    // Confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'Salarkitek <info@salarkitek.hu>',
      to: email,
      subject: 'Megkaptuk az üzenetét - Salarkitek',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #003366;">Köszönjük az üzenetét!</h2>

          <p>Kedves ${escapeHtml(nev)}!</p>

          <p>Megkaptuk a kapcsolati formán keresztül küldött üzenetét. Hamarosan felvesszük Önnel a kapcsolatot.</p>

          <p style="margin-top: 30px;">Üzenet összefoglalása:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px;">
            <p style="white-space: pre-wrap;">${escapeHtml(uzenet)}</p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

          <p style="color: #666; font-size: 12px;">
            <strong>Salarkitek Kft.</strong><br>
            Email: info@salarkitek.hu<br>
            Telefon: 06-30/396-6037
          </p>
        </div>
      `,
    });

    if (userEmailResult.error) {
      console.error('User confirmation email error:', userEmailResult.error);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { success: true, message: 'Üzenet sikeresen elküldve' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
