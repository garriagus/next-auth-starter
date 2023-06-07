export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/UserPost/:path*"],
  //matcher: ["/profile"],
  // matcher: ["/((?!register|api|login).*)"],
};