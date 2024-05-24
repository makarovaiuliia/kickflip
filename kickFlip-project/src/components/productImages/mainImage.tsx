interface MainImgProps {
    imageSrc: string;
}

export default function MainImage({ imageSrc }: MainImgProps) {
    return (
        <div className="image-wrapper">
            <img className="main-img" src={imageSrc} alt="" />
        </div>
    );
}
