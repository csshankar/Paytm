import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import type { Session } from "next-auth";

export async function getSessionSafely(): Promise<Session | null> {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        const err = error as { name?: string; message?: string };
        if (err?.name === 'JWEDecryptionFailed' || err?.message?.includes('decryption')) {
            console.warn('JWT decryption failed, clearing invalid session');
            return null;
        }
        throw error;
    }
}

