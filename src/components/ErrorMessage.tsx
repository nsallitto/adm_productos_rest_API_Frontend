import { PropsWithChildren } from "react";


export default function ErrorMessage({children}: PropsWithChildren) {
    return (
        <div className="bg-red-600 text-white text-center font-bold uppercase my-4 p-2">
            {children}
        </div>
    )
}
