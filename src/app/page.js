'use client'

import Image from "next/image";
import { UserAuth } from "./authContext";
import { useEffect } from "react";
import Login from "./pages/Login";

export default function Home() {
  const { user, logOut } = UserAuth();

  if (!user) {
    return <Login />
  }


  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user)


  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="bg-red-200 rounded p-10">
        <h1 className="text-2xl font-bold text-black">Merhaba, {user.displayName}</h1>
        <button className="text-black font-bold text-center w-full mt-10" onClick={handleSignOut}>Çıkış Yap</button>
      </div>
    </div>
  );
}
