import BoldBtn from "../features/bold/BoldBtn"
import HeadingBtn from "../features/heading/HeadingBtn"
import ImageBtn from "../features/image/ImageBtn"
import ItalicBtn from "../features/italic/ItalicBtn"
import UnderLineBtn from "../features/underline/UnderLineBtn"

const Toolbar = () => {
    return (
        <nav>
            <BoldBtn />
            <ItalicBtn />
            <UnderLineBtn />
            <HeadingBtn format="heading-one" label="h1" />
            <HeadingBtn format="heading-two" label="h2" />
            <HeadingBtn format="heading-three" label="h3" />
            <HeadingBtn format="heading-four" label="h4" />
            <HeadingBtn format="heading-five" label="h5" />
            <HeadingBtn format="heading-six" label="h6" />
            <ImageBtn />
        </nav>
    )
}

export default Toolbar;