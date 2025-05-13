import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getLpDetail } from '../../apis/lp';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Comments from './components/comments';

function Lp() {
    const { lpId } = useParams<{ lpId: string }>();
    const id = Number(lpId);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['lpDetail', id],
        queryFn: () => getLpDetail(id),
        enabled: Number.isFinite(id),
    });

    if (!Number.isFinite(id)) return <ErrorMessage />;
    if (isLoading) return <LoadingSpinner />;
    if (isError || !data?.data) return <ErrorMessage />;

    const lp = data.data;

    return (
        <main className="flex flex-col items-center gap-8 px-4 pb-12">
            <article className="w-full max-w-3xl p-6 bg-white shadow-md rounded-xl">
                <div className="flex justify-center mt-4">
                    <div className="relative flex items-center justify-center rounded-full h-80 w-80">
                        <img
                            src={lp.thumbnail}
                            alt={lp.title}
                            className="object-cover rounded-full shadow-inner aspect-square animate-spin-slow"
                        />
                    </div>
                </div>

                <h1 className="mt-6 text-3xl font-bold text-center text-gray-800">
                    {lp.title}
                </h1>
                <p className="mt-1 text-sm text-center text-gray-500">
                    {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p>{lpId}</p>

                <p className="mt-6 text-base leading-7 text-gray-700 whitespace-pre-line">
                    {lp.content}
                </p>

                <div className="mt-6 text-sm text-gray-600">
                    <p className="mb-2 text-base">작성자 : {lp.author.name}</p>
                    <p>❤️ {lp.likes.length}</p>
                </div>
            </article>

            <section className="w-full max-w-3xl">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    댓글
                </h2>
                <div className="bg-white shadow-md rounded-xl max-h-[32rem] overflow-y-auto">
                    <Comments lpId={lp.id} />
                </div>
            </section>
        </main>
    );
}

export default Lp;
