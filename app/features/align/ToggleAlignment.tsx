import { AlignmentType } from "@/app/core/EditorTypes";
import { Editor, Transforms, Element as SlateElement } from "slate";

export const ToggleAlignment = (
    editor: Editor,
    alignment: AlignmentType
) => {
    Transforms.setNodes(
        editor,
        { align: alignment },
        {
            match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                Editor.isBlock(editor, n),
        }
    )
}