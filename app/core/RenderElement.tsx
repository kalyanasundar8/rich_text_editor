import Image from "next/image";
import { RenderElementProps } from "slate-react";
import ImageUploadUI from "../features/image/ImageUploadUI";
import LinkElement from "../features/link/LinkElement";
import EmbedElement from "../features/embed/EmbedElement";

export const renderElement = (props: RenderElementProps) => {
    const { children, attributes, element } = props;

    switch (element.type) {
        case "paragraph":
            return <p {...attributes}>{children}</p>
        case "heading-one":
            return <h1 {...attributes} className="text-4xl font-bold">{children}</h1>
        case "heading-two":
            return <h2 {...attributes} className="text-3xl font-bold">{children}</h2>
        case "heading-three":
            return <h3 {...attributes} className="text-2xl font-bold">{children}</h3>
        case "heading-four":
            return <h4 {...attributes} className="text-xl font-bold">{children}</h4>
        case "heading-five":
            return <h5 {...attributes} className="text-lg font-bold">{children}</h5>
        case "heading-six":
            return <h6 {...attributes} className="text-base font-bold">{children}</h6>
        case "image":
            return (
                <div {...attributes}>
                    <div contentEditable={false}>
                        <Image
                            src={element.url}
                            style={{ maxWidth: "100%" }}
                            alt=""
                        />
                    </div>
                    {children}
                </div>
            )
        case "image-upload":
            return (
                <div {...attributes}>
                    <div contentEditable={false}>
                        <ImageUploadUI element={element} />
                    </div>
                    {children}
                </div>
            )
        case "link":
            return <LinkElement {...props} element={element} />
        case "embed":
            return <EmbedElement {...props} element={element} />
        default:
            return <p {...attributes}>{children}</p>
    }
}