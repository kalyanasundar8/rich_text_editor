import { NotepadTextDashed, SendHorizonal } from "lucide-react";

const EditorNavbar = () => {
    return (
        <header className="p-3 md:p-5 border border-gray-200">
            <nav className="max-w-xl md:max-w-3xl lg:max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-xl md:text-2xl font-bold">Writes</h1>
                <ul className="flex items-center space-x-3">
                    <button className="flex items-center md:space-x-2 bg-gray-100 p-1 md:px-2 md:py-1 rounded-md border border-gray-200">
                        <NotepadTextDashed size={14} className="text-gray-500" />
                        <span className="hidden md:block md:text-[12px]">Save as draft</span>
                    </button>
                    <button className="flex items-center md:space-x-2 bg-gray-100 p-1 md:px-2 md:py-1 rounded-md border border-gray-200">
                        <SendHorizonal size={14} className="text-gray-500" />
                        <span className="hidden md:block md:text-[12px]">Publish</span>
                    </button>
                </ul>
            </nav>
        </header >
    )
}

export default EditorNavbar;