import { useSlate } from "slate-react"
import insertImageUpload from "./InsertImageUpload";
import { LucideIcon } from "lucide-react";

type ImageBtnProps = {
    icon: LucideIcon
}

const ImageBtn = ({ icon: Icon }: ImageBtnProps) => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        insertImageUpload(editor);
    };

    return (
        <button
            onMouseDown={handleClick}
            className="flex items-center md:space-x-2 p-1 md:px-2 md:py-1 rounded-md border border-transparent"
        >
            <Icon size={16} />
        </button>
    )
}

export default ImageBtn;