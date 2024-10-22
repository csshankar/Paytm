import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <a href="#">
        <div className="text-2xl text-[#6a51a6] flex flex-col justify-center font-bold pt-2 ">
            PayTM
        </div>
        </a>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}