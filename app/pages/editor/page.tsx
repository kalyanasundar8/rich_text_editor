import RichEditor from "@/app/core/RichEditor"
import EditorNavbar from "@/app/shared/ui/EditorNavbar";

const Editor = () => {
    return (
        <section>
            <div className="">
                <EditorNavbar />
                <div className="max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto p-3">
                    <RichEditor />
                </div>
            </div>
        </section>
    )
}

export default Editor;