import { NextRequest, NextResponse } from 'next/server';
import { Buffer } from 'buffer';

// Ensure we use the Node.js runtime so Buffer & other Node APIs are available
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const language = (formData.get('language') as string) || 'auto';

    if (!file) {
      return NextResponse.json({ message: 'File is required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    const endpoint = process.env.AZURE_MISTRAL_OCR_ENDPOINT;
    const apiKey = process.env.AZURE_MISTRAL_OCR_API_KEY;

    if (!endpoint || !apiKey) {
      return NextResponse.json({ message: 'OCR service not configured' }, { status: 500 });
    }

    const isPdf = file.type === 'application/pdf';

    const body: Record<string, any> = {
      model: 'mistral-ocr-2503',
      document: isPdf
        ? {
            type: 'document_url',
            document_url: `data:${file.type};base64,${base64}`,
          }
        : {
            type: 'image_url',
            image_url: `data:${file.type};base64,${base64}`,
          },
      include_image_base64: true,
    };

    if (language !== 'auto') {
      body.language = language;
    }

    const res = await fetch(`${endpoint}/v1/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OCR API error', errText);
      return NextResponse.json({ message: 'OCR request failed' }, { status: 502 });
    }

    const data = await res.json();
    const text: string = Array.isArray(data.pages)
      ? data.pages.map((p: any) => p.markdown || '').join('\n\n').trim()
      : '';

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Internal OCR route error', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 