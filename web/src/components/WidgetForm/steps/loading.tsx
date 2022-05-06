import { CircleNotch } from "phosphor-react";

export function Loading(){
    return (
        <div className="w-6 h-6">
            <CircleNotch weight="bold" className="w-6 h-6 animate-spin" />
        </div>
    )
}