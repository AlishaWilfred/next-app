"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react'
import { sign } from "crypto";

export const Navbar: FC<{
  session: any | null;
}> = ({ session }) => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  console.log({ session });
  return (
    <>
      <nav className="bg-blue-100 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BlogApp
            </span>
          </a>
          <div onMouseLeave={()=>setShowProfile(false)} className="relative">
          <div
            className="flex items-center md:order-2 "
            onMouseEnter={() => setShowProfile(true)}
          >
            {session?.user ? (
              <button>{session.user.name}</button>
            ) : (
                <div>
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/> */}
                <span
                  className="text-white"
                  onClick={() => router.push("/login")}
                >
                  Log in{" "}
                </span>
              </button>
              {showProfile ? (
              <div
              className="absolute mr-20 "
                // className="z-50 absolute  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                   {session?.user.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {session?.user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
            
                
                  <li>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={()=>signOut()}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
              </div>
            )}
            {/* <!-- Dropdown menu --> */}
           
        
          </div>
         
          </div>
     
        </div>
      </nav>
    </>
  );
};
