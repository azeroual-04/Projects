import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // Check for admin authentication cookie
    const adminAuth = request.cookies.get("admin-auth-store")

    if (!adminAuth) {
      // Redirect to admin login if not authenticated
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Parse the auth cookie to check authentication status
      const authData = JSON.parse(adminAuth.value)
      const isAuthenticated = authData?.state?.isAuthenticated

      if (!isAuthenticated) {
        const loginUrl = new URL("/admin/login", request.url)
        return NextResponse.redirect(loginUrl)
      }
    } catch (error) {
      // If cookie is malformed, redirect to login
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all admin routes except static files
     */
    "/admin/:path*",
  ],
}
