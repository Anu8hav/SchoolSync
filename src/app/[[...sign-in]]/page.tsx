"use client";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: username,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Sign In Form */}
      <div className="flex w-full flex-col justify-between p-8 lg:w-1/2 lg:p-16">
        <div className="flex items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="SchoolSync Logo"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            SchoolSync
          </span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <p className="text-sm font-medium text-slate-500">
            Start your journey
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Sign In to SchoolSync
          </h1>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-500">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-md border border-slate-300 p-4 text-sm focus:border-purple-400 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-slate-300 p-4 text-sm focus:border-purple-400 focus:outline-none transition-colors"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} SchoolSync. All rights reserved.
        </div>
      </div>

      {/* Right Side: Pastel Gradient Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #FEF9C3 0%, #DBEAFE 50%, #F3E8FF 100%)`,
          }}
        />
        {/* Subtle noise/texture overlay to give it a premium feel */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>
    </div>
  );
}
