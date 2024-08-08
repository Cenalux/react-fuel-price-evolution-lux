import * as React from "react";
import { useState } from "react";
import BasicTable from "./components/Table";
import useDataFetcher from "./hooks/DataFetcher";
import PaginationRounded from "./components/Pagination";
import LiveTimer from "./components/LiveTime";
import BasicLineChart from "./components/Chart"
import './LiveTime.css'


const ITEMS_PER_PAGE = 16;

export default function App() {
    const { datePetrolData } = useDataFetcher();
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedData = datePetrolData ? datePetrolData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) : [];

    return (
        <>
            <h1>Fuel price evolution in Luxembourg</h1>
            <div className="LiveTimer">
            <LiveTimer />
            </div>
            <BasicTable data={paginatedData} />
            <PaginationRounded count={Math.ceil((datePetrolData?.length || 0) / ITEMS_PER_PAGE)} page={page} onChange={handleChange}
            />
            <button className="fetch-btn">PlaceHolder BTN to re-fetch data</button>
            <h2>Chart</h2>
            <BasicLineChart />
        </>
    );
}
