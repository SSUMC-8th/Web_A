import { useQuery } from '@tanstack/react-query';
import useFetch from '../hooks/useFetch';

function HomePage() {
    const { data } = useQuery({
        queryKey: ['lps'],
        queryFn: fetchLps,
    });

    return (
        <div>1</div>
        // <div className="grid grid-cols-6 gap-4 p-4">
        //     {data?.results.map((lp) => <Card key={lp.id} movie={lp} />)}
        // </div>
    );
}

export default HomePage;
