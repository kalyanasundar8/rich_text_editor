import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"
import withLinks from "../features/link/LinkUtils"

const CreateRichEditor = () => {
    const editor = withLinks(withHistory(withReact(createEditor())));

    const { isVoid } = editor;

    editor.isVoid = (element) => {
        return element.type === "image" || element.type === "image-upload" || element.type === "embed" ? true : isVoid(element);
    }

    return editor;
}

export default CreateRichEditor;