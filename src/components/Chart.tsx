import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useContainerSize } from '../hooks/Resizer'; // Ensure the path is correct

export default function BasicLineChart() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { width, height } = useContainerSize(containerRef);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={width}
                height={height || 300} // Fallback to 300 if height is 0
            />
        </div>
    );
}
