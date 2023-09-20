"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from 'next-auth/react'


export default function page() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


const handleSubmit = async (e:any) => {
  e.preventDefault();
  console.log({inputData})

  const response = await signIn("credentials", {
    email: inputData.email,
    password: inputData.password,
    redirect: false, // We handle redirection manually
    callbackUrl:"/"
  });

  console.log({response})

  if (!response?.error) {
      console.log({response})
    router.push("/"); // Redirect to a protected page upon successful login
  } else {
    console.log("LOGIN ERROR")
    // Handle login error
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-medium mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label>Email</label>
        <input
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-700 px-2 py-1 text-white hover:bg-blue-900 hover:ring-2 hover:ring-blue-900 transform transition-all duration-500 ease-out"
        >
          Submit
        </button>
      </form>
      <div className="flex items-center gap-3 mt-6">
        <span>Haven't created an account yet?</span>
        <Link href="/register">
          <span className="text-blue-800 hover:underline">Register</span>
        </Link>
      </div>
    </div>
  );
}
