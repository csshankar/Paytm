"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        setError("");
        // In the current implementation, 'signin' also handles creation if user doesn't exist
        const res = await signIn("credentials", {
            phone,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Error creating account. Try again.");
        } else {
            router.push("/dashboard");
        }
    }

    return <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
        <div className="space-y-4">
            <TextInput label="Phone Number" placeholder="1234567890" onChange={setPhone} />
            <TextInput label="Password" placeholder="******" type="password" onChange={setPassword} />
            
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div className="pt-4 flex justify-center">
                <Button onClick={handleSubmit}>Sign Up</Button>
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account? <Link href="/auth/signin" className="text-[#6a51a6] hover:underline">Login</Link>
            </p>
        </div>
    </div>
}
