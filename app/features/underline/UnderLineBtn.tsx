import { useSlate } from "slate-react";
import { toggleUnderline } from "./ToggleUnderLine";
import { LucideIcon } from "lucide-react";

type UnderLineBtnProps = {
    icon: LucideIcon;
}

const UnderLineBtn = ({ icon: Icon }: UnderLineBtnProps) => {
    const editor = useSlate();
    return (
        <button
            onMouseDown={(event) => {
                event.preventDefault();
                toggleUnderline(editor);
            }}
            className="flex items-center md:space-x-2 p-1 md:px-2 md:py-1 rounded-md border border-transparent"
        >
            <Icon size={16} />
        </button>
    )
}

export default UnderLineBtn;