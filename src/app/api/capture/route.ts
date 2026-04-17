import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Get UTM params from referer if available
    const source = req.headers.get('referer') || 'direct';

    // Save to Supabase if configured
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supaUrl && supaKey) {
      await fetch(`${supaUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${supaKey}`,
          apikey: supaKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email, role, source }),
      });
    }

    // TODO: Send PDF via Resend when RESEND_API_KEY is configured
    // TODO: Send notification to Guillermo

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Capture error:', e);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
