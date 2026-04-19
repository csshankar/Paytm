"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={() => signIn('credentials', { callbackUrl: '/dashboard' })} onSignout={async () => {
        await signOut({ callbackUrl: '/' })
        router.push("/")
      }} user={session.data?.user} />
   </div>
  );
}
