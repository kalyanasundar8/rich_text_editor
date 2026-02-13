import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"

const CreateRichEditor = () => {
    return withHistory(withReact(createEditor()));
}

export default CreateRichEditor;