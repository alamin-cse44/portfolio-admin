import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  landLord: [/^\/landLord/, /^\/profile/, /^\/landLord/],
  tenant: [/^\/tenant/, /^\/profile/],
  admin: [/^\/admin/, /^\/profile/, /^\/listings/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  console.log("user info", userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          // `https://house-renting-nine.vercel.app/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (
    userInfo?.userRole &&
    roleBasedPrivateRoutes[userInfo?.userRole as Role]
  ) {
    const routes = roleBasedPrivateRoutes[userInfo?.userRole as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/profile",
    "/listings",
    "/admin",
    "/admin/:page",
    "/landLord/:page",
    "/user",
    "/user/:page",
  ],
};
