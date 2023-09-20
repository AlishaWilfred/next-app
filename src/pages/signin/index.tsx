"use client";
import { headers } from "next/dist/client/components/headers";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: "",
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ inputData });

    const response = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ response });
    if (response.ok) {
      router.push("/login");
    } else {
      console.log("Register error");
    }

 
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-medium mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label>Name</label>
        <input
          id="name"
          name="name"
          value={inputData.name}
          placeholder="Enter your name"
          type="text"
          onChange={handleChange}
        />

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
        <span>Do you have an account?</span>
        <Link href="/login">
          <span className="text-blue-800 hover:underline">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
