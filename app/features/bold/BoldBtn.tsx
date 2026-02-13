import { useSlate } from "slate-react";
import { toggleBold } from "./ToggleBold";

const BoldBtn = () => {
    const editor = useSlate();
    return (
        <button onMouseDown={(event) => {
            event.preventDefault();
            toggleBold(editor)
        }}>
            Bold
        </button>
    )
}

export default BoldBtn;