import { Inter } from "next/font/google";

import SessionProvider from "./session-provider";
import { getServerSession } from "next-auth";
import UserState from "@/context/userContext/userState";
import mongoose from "mongoose";
import Users from "@/models/user/userSchema";
// import './globals.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  let user = null;
  if (session) {
    // console.log("session", session);
    const response = await fetch(`http://localhost:3000/api/user/get-user-data/${session.user.email}`);
    const data=await response.json();
    user=data.user;
  }
  else{
    user="unauthenticated";
  }
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <UserState user={user}>
          <body className={inter.className}>{children}</body>
        </UserState>
      </SessionProvider>
    </html>
  );
}
