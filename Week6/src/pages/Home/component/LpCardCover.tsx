import { LpItem } from '../../../types/lp';

interface LpCardCoverProps {
    lp: LpItem;
}

function LpCardCover({ lp }: LpCardCoverProps) {
    const { title, createdAt, likes } = lp;

    return (
        <div className="absolute inset-0 flex flex-col justify-end px-4 py-4 text-white transition-opacity duration-300 bg-black opacity-0 bg-opacity-60 group-hover:opacity-100">
            <h5 className="text-lg font-semibold">{title}</h5>
            <p className="text-sm">{createdAt}</p>
            <p className="text-sm">❤️ {likes.length}</p>
        </div>
    );
}

export default LpCardCover;
