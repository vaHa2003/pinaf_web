import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductTableRow from '../ProductTableRow';
import { TablePagination } from '@mui/material';

function ProductTable({ data, refetch }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <React.Fragment>
            <div style={{ height: 300, width: '100%' }}>
                {/* ============= table============== */}
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                    }}
                >
                    <Table sx={{ minWidth: 650, fontFamily: 'SF Mono' }} aria-label="simple table">
                        <TableHead sx={{ background: '#296253' }}>
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        fontFamily: 'SF Mono',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#ffff',
                                    },
                                }}
                            >
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Hình ảnh</TableCell>
                                <TableCell align="center">Giá sản phẩm</TableCell>
                                <TableCell align="center">Miêu tả</TableCell>
                                <TableCell align="center">Tồn kho</TableCell>
                                <TableCell align="center">Đã bán</TableCell>
                                <TableCell align="center">Tình Trạng</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody style={{ fontSize: '1rem' }}>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <ProductTableRow key={row.id} row={row} refetch={refetch} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* phân trang */}
                <TablePagination
                    rowsPerPageOptions={[2, 4, 10, 12]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    component="div"
                    count={data.length}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                ></TablePagination>
            </div>
        </React.Fragment>
    );
}

export default ProductTable;
