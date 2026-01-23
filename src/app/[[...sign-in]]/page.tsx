"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
      // appearance={{
      //   elements: {
      //     footer: "hidden",
      //   },
      // }}
      />
    </div>
  );
}
