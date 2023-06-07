"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';
import Link from "next/link";

const Buttons = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="text-green-600 ml-auto">
        Sign In
      </button>
      <Link href="/register" style={{ marginRight: 10 }}>
        Register
      </Link>
      <Link href="/profile">Profile</Link>;
    </>
  );
};

export default Buttons;