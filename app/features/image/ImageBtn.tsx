import { useSlate } from "slate-react"
import insertImageUpload from "./InsertImageUpload";

const ImageBtn = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        insertImageUpload(editor);
    };

    return (
        <button
            onMouseDown={handleClick}
        >
            Image
        </button>
    )
}

export default ImageBtn;