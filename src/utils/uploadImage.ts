export async function uploadImageDirectly(file: File): Promise<string | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // إذا كانت بيانات Supabase متوفرة نرفع عليها
    if (supabaseUrl && supabaseKey) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = uniqueSuffix + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const uploadUrl = `${supabaseUrl}/storage/v1/object/images/${filename}`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
          'Content-Type': file.type || 'image/png',
        },
        body: file,
      });

      if (response.ok) {
        return `${supabaseUrl}/storage/v1/object/public/images/${filename}`;
      }
    }

    // إذا كنا نعمل محلياً، نرفع الصورة محلياً داخل مجلد المشروع
    const formData = new FormData();
    formData.append('file', file);

    const localResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!localResponse.ok) {
      const err = await localResponse.json();
      alert('فشل رفع الصورة: ' + (err.error || 'خطأ غير معروف'));
      return null;
    }

    const data = await localResponse.json();
    return data.url;
  } catch (error) {
    console.error("Upload error:", error);
    alert('حدث خطأ أثناء رفع الصورة');
    return null;
  }
}
