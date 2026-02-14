"use client";

import { LinkElement as LinkElementType } from "../../core/EditorTypes";
import { RenderElementProps } from "slate-react";

interface LinkElementProps extends RenderElementProps {
    element: LinkElementType;
}

const LinkElement = ({ attributes, children, element }: LinkElementProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Open link on Cmd+Click (Mac) or Ctrl+Click (Windows/Linux)
        if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            window.open(element.url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <a
            {...attributes}
            href={element.url}
            onClick={handleClick}
            className="editor-link"
            title={`${element.url} (Cmd+Click to open)`}
        >
            {children}
        </a>
    );
};

export default LinkElement;
