import { useState, useEffect } from 'react';

export const useContainerSize = (targetRef: React.RefObject<HTMLElement>) => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setSize(entry.contentRect);
            });
        });

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [targetRef]);

    return size;
};
