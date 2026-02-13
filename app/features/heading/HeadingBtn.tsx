import { useSlate } from "slate-react";
import { toggleHeading } from "./ToggleHeading";
import { HeadingType } from "@/app/core/EditorTypes";

type HeadingBtnProps = {
    format: HeadingType;
    label: string;
}

const HeadingBtn = ({ format, label }: HeadingBtnProps) => {
    const editor = useSlate();
    return (
        <button

            onMouseDown={(event) => {
                event.preventDefault();
                toggleHeading(editor, format)
            }}>
            {label}
        </button>
    )
}

export default HeadingBtn;