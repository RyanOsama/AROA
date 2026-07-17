'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super_secret_key_change_me_in_production'
);

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, error: 'اسم المستخدم وكلمة المرور مطلوبة' };
  }

  try {
    // 1. Check Rate Limit (Login Attempts)
    let loginAttempt = await prisma.loginAttempt.findUnique({
      where: { username },
    });

    if (loginAttempt && loginAttempt.blockedUntil && loginAttempt.blockedUntil > new Date()) {
      return { 
        success: false, 
        error: `تم حظر الحساب مؤقتاً بسبب كثرة المحاولات. الرجاء المحاولة بعد ${Math.ceil((loginAttempt.blockedUntil.getTime() - new Date().getTime()) / 60000)} دقيقة` 
      };
    }

    // 2. Initialize default admin if none exists (for first run)
    const adminCount = await prisma.adminUser.count();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.adminUser.create({
        data: {
          username: 'admin',
          password: hashedPassword,
        }
      });
    }

    // 3. Find User
    const admin = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!admin) {
      return await handleFailedLogin(username, loginAttempt);
    }

    // 4. Verify Password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return await handleFailedLogin(username, loginAttempt);
    }

    // 5. Success! Reset attempts
    if (loginAttempt) {
      await prisma.loginAttempt.update({
        where: { username },
        data: { attempts: 0, blockedUntil: null },
      });
    }

    // 6. Generate JWT and set cookie
    const token = await new SignJWT({ username: admin.username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true };

  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: 'حدث خطأ غير متوقع أثناء تسجيل الدخول' };
  }
}

async function handleFailedLogin(username: string, currentAttempt: any) {
  if (!currentAttempt) {
    await prisma.loginAttempt.create({
      data: { username, attempts: 1 }
    });
  } else {
    const newAttempts = currentAttempt.attempts + 1;
    let blockedUntil = null;
    
    // Block for 15 minutes after 5 failed attempts
    if (newAttempts >= 5) {
      blockedUntil = new Date(Date.now() + 15 * 60000); 
    }

    await prisma.loginAttempt.update({
      where: { username },
      data: { 
        attempts: newAttempts,
        blockedUntil
      }
    });
  }
  return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
}

export async function logoutAction() {
  cookies().delete('admin_token');
  redirect('/login');
}
