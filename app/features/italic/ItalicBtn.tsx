import { useSlate } from "slate-react"
import { toggleItalic } from "./ToggleItalic"

const ItalicBtn = () => {
    const editor = useSlate();
    return (
        <button onMouseDown={(event) => {
            event.preventDefault();
            toggleItalic(editor);
        }}>Italic</button>
    )
}

export default ItalicBtn;