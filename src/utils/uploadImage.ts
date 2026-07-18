export async function uploadImageDirectly(file: File): Promise<string | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      alert("بيانات Supabase غير موجودة، تأكد من إضافتها في Vercel");
      return null;
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    
    // Upload directly to Supabase Storage REST API bypassing Vercel's payload limit
    const uploadUrl = `${supabaseUrl}/storage/v1/object/images/${filename}`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Content-Type': file.type || 'image/png',
      },
      body: file, // Direct file upload
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("Supabase Storage error:", errData);
      alert("فشل رفع الصورة للسحابة: " + errData);
      return null;
    }

    // Return the public URL
    return `${supabaseUrl}/storage/v1/object/public/images/${filename}`;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}
