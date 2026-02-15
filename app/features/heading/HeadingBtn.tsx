import { useSlate } from "slate-react";
import { toggleHeading } from "./ToggleHeading";
import { HeadingType } from "@/app/core/EditorTypes";
import { LucideIcon } from "lucide-react";

type HeadingBtnProps = {
    format: HeadingType;
    icon: LucideIcon;
}

const HeadingBtn = ({ format, icon: Icon }: HeadingBtnProps) => {
    const editor = useSlate();
    return (
        <button
            onMouseDown={(event) => {
                event.preventDefault();
                toggleHeading(editor, format);
            }}
        >
            <Icon size={20} />
        </button>
    );
};

export default HeadingBtn;