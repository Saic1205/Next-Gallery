'use server';
import prisma from '@/prisma/client';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
export async function handleLogout(token: string) {
  await prisma.session.delete({ where: { token } });
}