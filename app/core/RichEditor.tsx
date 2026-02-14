'use client'
import { useState } from "react"
import { Editable, Slate } from "slate-react"
import CreateRichEditor from "./WithEditor"
import { renderElement } from "./RenderElement"
import { renderLeaf } from "./RenderLeaf"
import { CustomElement } from "./EditorTypes"
import Toolbar from "../toolbar/Toolbar"

const RichEditor = () => {

    // Main editor setup
    const [editor] = useState(CreateRichEditor());

    // Initial value for the editor
    const initialValue: CustomElement[] = [
        {
            type: "paragraph",
            children: [{ text: "Start writing you content here..." }],
        }
    ]

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Toolbar />
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
    )
}

export default RichEditor;