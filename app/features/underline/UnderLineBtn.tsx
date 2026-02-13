import { useSlate } from "slate-react";
import { toggleUnderline } from "./ToggleUnderLine";

const UnderLineBtn = () => {
    const editor = useSlate();
    return (
        <button
            onMouseDown={(event) => {
                event.preventDefault();
                toggleUnderline(editor);
            }}
        >Underline</button>
    )
}

export default UnderLineBtn;