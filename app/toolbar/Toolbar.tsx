import BoldBtn from "../features/bold/BoldBtn"
import HeadingDropdown from "../features/heading/HeadingDropdown"
import ImageBtn from "../features/image/ImageBtn"
import ItalicBtn from "../features/italic/ItalicBtn"
import AlignmentBtn from "../features/align/AlignBtn"
import UnderLineBtn from "../features/underline/UnderLineBtn"
import { StandardIcons } from "./StandardIcons"

const Toolbar = () => {
    return (
        <nav className="flex items-center space-x-2">
            <div className="flex items-center">
                <BoldBtn icon={StandardIcons.bold} />
                <ItalicBtn icon={StandardIcons.italic} />
                <UnderLineBtn icon={StandardIcons.underline} />
            </div>
            <span className="text-gray-300">|</span>
            <div>
                <HeadingDropdown />
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center">
                <AlignmentBtn format="left" icon={StandardIcons.leftAlign} />
                <AlignmentBtn format="right" icon={StandardIcons.rightAlign} />
                <AlignmentBtn format="center" icon={StandardIcons.centerAlign} />
                <AlignmentBtn format="justify" icon={StandardIcons.justifyAlign} />
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center">
                <ImageBtn icon={StandardIcons.image} />
            </div>
        </nav>
    )
}

export default Toolbar;