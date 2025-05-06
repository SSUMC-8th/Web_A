import { useQuery } from '@tanstack/react-query';
import { getLpInfo } from '../../apis/lp';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import LpCard from './component/LpCard';
import { LpItem } from '../../types/lp';

function HomePage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['lpInfo'],
        queryFn: getLpInfo,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage />;

    const lpList: LpItem[] = data?.data?.data ?? [];

    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {lpList.map((lp) => (
                <LpCard key={lp.id} lp={lp} />
            ))}
        </div>
    );
}

export default HomePage;
