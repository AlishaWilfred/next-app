"use client";
import { headers } from "next/dist/client/components/headers";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
    if (response.ok) {
      toast.success("Registeration Successful");
      router.push("/login");
    } else {
      toast.error("Register error");
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
