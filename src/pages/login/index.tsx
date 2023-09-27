"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    signIn("credentials", {
      email: inputData.email,
      password: inputData.password,
      redirect: false, // We handle redirection manually
      callbackUrl: "/",
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Logged in successfully");
          router.push("/users");
        }
      })
      .finally(() => setLoading(false));
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="flex items-center gap-3 mt-6">
        <span>Haven't created an account yet?</span>
        <Link href="/signup">
          <span className="text-blue-800 hover:underline">Register</span>
        </Link>
      </div>
    </div>
  );
}
