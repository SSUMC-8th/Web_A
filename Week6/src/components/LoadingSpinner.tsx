function LoadingSpinner() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div
                className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"
                role="status"
            >
                <span className="sr-only">로딩 중...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;
