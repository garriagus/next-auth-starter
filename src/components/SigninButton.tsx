"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  if (session && session.user) {
    return (
      <div className="flex">
        <p className="text-sky-600">{session.user.email}</p>
        
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} 
    type="button" className="btn btn-primary" data-bs-toggle="modal"data-bs-target="#exampleModal">
      Sign In
    </button>
  );
};

export default SigninButton;
