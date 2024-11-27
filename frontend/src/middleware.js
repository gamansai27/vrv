import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  console.log(path)
  const token = request.cookies.get('refreshToken')?.value || ''
  
  if (path === '/employee' && token) {
    return NextResponse.redirect(new URL('/employee/dashboard', request.url))
  }
  
  if (path.startsWith('/employee/') && path !== '/employee') {
    if (!token) {
      return NextResponse.redirect(new URL('/employee', request.url))
    }

    try {
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/employee', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/employee',
    '/employee/:path*'
  ]
}