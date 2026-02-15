import { AlignmentType } from "@/app/core/EditorTypes"
import { ToggleAlignment } from "./ToggleAlignment";
import { useSlate } from "slate-react";
import { LucideIcon } from "lucide-react";

export type AlignmentBtnProps = {
    format: AlignmentType;
    icon: LucideIcon;
}

const AlignmentBtn = ({ format, icon: Icon }: AlignmentBtnProps) => {
    const editor = useSlate();

    return (
        <button onMouseDown={(event) => {
            event.preventDefault();
            ToggleAlignment(editor, format);
        }} className="flex items-center md:space-x-2 p-1 md:px-2 md:py-1 rounded-md border border-transparent">
            <Icon size={16} />
        </button>
    )
}

export default AlignmentBtn;