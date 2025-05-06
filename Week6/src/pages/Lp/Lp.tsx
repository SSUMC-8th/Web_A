import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getLpDetail } from '../../apis/lp';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

function Lp() {
    const { lpId } = useParams<{ lpId: string }>();
    const id = Number(lpId);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['lpDetail', id],
        queryFn: () => getLpDetail(id),
        staleTime: 0,
        enabled: Number.isFinite(id), // NaN 차단
    });

    if (!Number.isFinite(id)) {
        console.log('찾았다 ㅅㅂ');
        return <ErrorMessage />;
    }
    if (isLoading) return <LoadingSpinner />;
    if (isError || !data?.data) return <ErrorMessage />;

    const lp = data.data; // LpDetailItem

    return (
        <div className="max-w-3xl p-4 mx-auto">
            <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full rounded-lg"
            />

            <h1 className="mt-4 text-2xl font-bold">{lp.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
                {new Date(lp.createdAt).toLocaleDateString()}
            </p>

            <p className="mt-4 whitespace-pre-line">{lp.content}</p>

            <div className="flex items-center gap-2 mt-6 text-sm">
                <span>❤️ {lp.likes.length}</span>
                <span className="text-gray-400">•</span>
                <span>작성자: {lp.author.name}</span>
            </div>
        </div>
    );
}

export default Lp;
