import { RenderLeafProps } from "slate-react"

export const renderLeaf = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;

    if (leaf.bold) {
        return <strong {...attributes}>{children}</strong>
    }

    if (leaf.italic) {
        return <em {...attributes}>{children}</em>
    }

    if (leaf.underline) {
        return <u {...attributes}>{children}</u>
    }

    return <span {...attributes} >{children}</span>
}