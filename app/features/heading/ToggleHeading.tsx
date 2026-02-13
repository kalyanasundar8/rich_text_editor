import { HeadingType } from "@/app/core/EditorTypes";
import { Editor, Element as SlateElement, Transforms } from "slate";

export const isHeadingActive = (
    editor: Editor,
    format: HeadingType
) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    });

    return !!match
}

export const toggleHeading = (
    editor: Editor,
    format: HeadingType
) => {
    const isHeadActive = isHeadingActive(editor, format);

    Transforms.setNodes(
        editor,
        { type: isHeadActive ? "paragraph" : format },
        { match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && Editor.isBlock(editor, n) }
    )
}