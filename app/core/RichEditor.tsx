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
            <div className="px-2 mt-5">
                <form action="" className="space-y-2">
                    <div>
                        <input type="text" placeholder="Write title" className="title text-5xl outline-none" />
                    </div>
                    <div>
                        <input type="text" placeholder="Add your description here" className="description outline-none" />
                    </div>
                    <div>
                        <label htmlFor="thumbnail-upload" className="text-sm">
                            Upload your review thumbnail
                        </label>
                        <input type="file" id="thumbnail-upload" className="hidden" accept="image/*" />
                    </div>
                </form>
            </div>
            <div className="mt-10">
                <Toolbar />
                <Editable renderElement={renderElement} renderLeaf={renderLeaf} className="outline-none px-2 mt-4" />
            </div>
        </Slate>
    )
}

export default RichEditor;