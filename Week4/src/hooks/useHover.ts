import { useEffect, useRef, useState, useCallback } from 'react';

function useHover<T extends HTMLElement = HTMLElement>() {
    const [isHover, setIsHover] = useState<boolean>(false);
    const ref = useRef<T | null>(null);

    const handleMouseEnter = useCallback(() => setIsHover(true), []);
    const handleMouseLeave = useCallback(() => setIsHover(false), []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseEnter, handleMouseLeave]);

    return [ref, isHover] as const; // 튜플 [RefObject<T|null>, boolean]
}

export default useHover;
