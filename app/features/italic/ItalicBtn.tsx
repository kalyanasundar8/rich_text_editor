import { useSlate } from "slate-react"
import { toggleItalic } from "./ToggleItalic"
import { LucideIcon } from "lucide-react"

type ItalicBtnProps = {
    icon: LucideIcon;
}

const ItalicBtn = ({ icon: Icon }: ItalicBtnProps) => {
    const editor = useSlate();
    return (
        <button onMouseDown={(event) => {
            event.preventDefault();
            toggleItalic(editor);
        }} className="flex items-center md:space-x-2 p-1 md:px-2 md:py-1 rounded-md border border-transparent">
            <Icon size={16} />
        </button>
    )
}

export default ItalicBtn;