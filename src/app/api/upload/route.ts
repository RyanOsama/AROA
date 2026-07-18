import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'لم يتم العثور على الصورة' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials in env");
      return NextResponse.json({ success: false, error: 'إعدادات رفع الصور غير مكتملة' }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    
    // Upload directly to Supabase Storage REST API
    const uploadUrl = `${supabaseUrl}/storage/v1/object/images/${filename}`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Content-Type': file.type || 'image/png',
      },
      body: buffer,
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("Supabase Storage error:", errData);
      return NextResponse.json({ success: false, error: 'فشل رفع الصورة إلى التخزين السحابي' }, { status: 500 });
    }

    // Return the public URL
    const fileUrl = `${supabaseUrl}/storage/v1/object/public/images/${filename}`;
    
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, error: 'حدث خطأ غير متوقع أثناء الرفع' }, { status: 500 });
  }
}
