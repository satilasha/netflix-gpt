import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from 'react-redux';

const Header = () => {

  const user = useSelector((state) => state.user);
  const router = useRouter();

  const handleSignOut = () => {
    // Sign out logic here
    signOut(auth).then(() => {
      router.push("/");
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="flex items-center justify-between absolute top-0 left-0 p-4 bg-linear-to-b from-black/80 via-black/80 to-transparent z-10">
      <img
        className="w-3/24"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Logo" />

      {user && (<div>
        <button onClick={handleSignOut} className="bg-red-600 px-4 py-2 rounded text-white font-semibold hover:bg-red-700 transition">Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header