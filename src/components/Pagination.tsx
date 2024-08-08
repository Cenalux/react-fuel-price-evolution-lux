import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationRoundedProps{
    count: number,
    page: number,
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationRounded({count, page, onChange}: PaginationRoundedProps ) {
    return (
        <Stack spacing={2}>
            <Pagination count={count} page={page} shape="rounded" onChange={onChange} />
            {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
        </Stack>
    );
}