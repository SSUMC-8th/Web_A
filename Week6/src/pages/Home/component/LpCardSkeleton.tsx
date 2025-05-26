import ContentLoader from 'react-content-loader';

function LpCardSkeleton() {
  return (
    <div className="relative overflow-hidden aspect-square">
      <ContentLoader
        speed={1}
        viewBox="0 0 300 300"
        backgroundColor="#e0e0e0"
        foregroundColor="#bdbdbd"
        className="w-full h-full"
        //비율무시
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" rx="8" ry="8" width="300" height="300" />
      </ContentLoader>
    </div>
  );
}

export default LpCardSkeleton;
