'use client'
import { useState } from "react"
import { Editable, Slate } from "slate-react"
import CreateRichEditor from "./WithEditor"
import { renderElement } from "./RenderElement"
import { renderLeaf } from "./RenderLeaf"
import BoldBtn from "../features/bold/BoldBtn"
import ItalicBtn from "../features/italic/ItalicBtn"
import UnderLineBtn from "../features/underline/UnderLineBtn"
import HeadingBtn from "../features/heading/HeadingBtn"
import { CustomElement } from "./EditorTypes"

const RichEditor = () => {

    // Main editor setup
    const [editor] = useState(CreateRichEditor());

    console.log(editor)

    // Initial value for the editor
    const initialValue: CustomElement[] = [
        {
            type: "paragraph",
            children: [{ text: "Start writing you content here..." }],
        }
    ]

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <BoldBtn />
            <ItalicBtn />
            <UnderLineBtn />
            <HeadingBtn format="heading-one" label="h1" />
            <HeadingBtn format="heading-two" label="h2" />
            <HeadingBtn format="heading-three" label="h3" />
            <HeadingBtn format="heading-four" label="h4" />
            <HeadingBtn format="heading-five" label="h5" />
            <HeadingBtn format="heading-six" label="h6" />
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
    )
}

export default RichEditor;