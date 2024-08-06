
'use server';
import prisma from '@/prisma/client';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';


const SESSION_EXPIRATION_HOURS = 24;

function generateToken() {
  return Math.random().toString(36).substr(2);
}

export async function handleLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken();
  const expires = new Date(Date.now() + SESSION_EXPIRATION_HOURS * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      token,
      expires,
      user: { connect: { id: user.id } },
    },
  });

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  return user;
}

export async function handleLogout() {
  const token = cookies().get('session')?.value;
  if (token) {
    await prisma.session.delete({ where: { token } });
    cookies().delete('session');
    
  }
}
