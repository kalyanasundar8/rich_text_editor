"use client";

import { EmbedElement as EmbedElementType } from "../../core/EditorTypes";
import { RenderElementProps } from "slate-react";

interface EmbedElementProps extends RenderElementProps {
    element: EmbedElementType;
}

const EmbedElement = ({ attributes, children, element }: EmbedElementProps) => {
    const renderEmbed = () => {
        switch (element.embedType) {
            case "youtube":
                return (
                    <iframe
                        src={element.url}
                        className="embed-iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video"
                    />
                );
            case "vimeo":
                return (
                    <iframe
                        src={element.url}
                        className="embed-iframe"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Vimeo video"
                    />
                );
            case "twitter":
                return (
                    <div className="embed-twitter">
                        <a
                            href={element.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="twitter-link"
                        >
                            View Tweet on X/Twitter ↗
                        </a>
                    </div>
                );
            default:
                return (
                    <div className="embed-generic">
                        <a
                            href={element.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {element.url}
                        </a>
                    </div>
                );
        }
    };

    return (
        <div {...attributes}>
            <div contentEditable={false} className="embed-container">
                {renderEmbed()}
            </div>
            {children}
        </div>
    );
};

export default EmbedElement;
