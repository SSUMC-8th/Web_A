interface CardCoverProps {
    title: string;
    overview: string | null;
}

function CardCover({ title, overview }: CardCoverProps) {
    return (
        <div className="absolute inset-0 flex flex-col justify-center px-4 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-60">
            <h5 className="mb-4 text-xl text-white">{title}</h5>
            <p className="overflow-hidden text-sm text-white">{overview}</p>
        </div>
    );
}

export default CardCover;
