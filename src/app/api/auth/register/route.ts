import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, role, password } = await req.json()
    console.log(name, email, role, password)
    const hashedPassword = await hash(password, 10)

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists', status: 400 },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name,
        email, role,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { 
        user: {
          name: user.name,
          email: user.email,
        },
        status: 201
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!', error },
      { status: 500 }
    )
  }
}