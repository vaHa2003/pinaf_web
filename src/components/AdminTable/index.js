import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminTableRow from '~/components/AdminTableRow';
import { TablePagination } from '@mui/material';

function AdminTable({ fetchProductData, data }) {
    // phân trang
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <div style={{ height: 400, width: '100%', marginBottom: '100px' }}>
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
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: '#ffff',
                                    },
                                }}
                            >
                                <TableCell align="left">Mã nhân viên</TableCell>
                                <TableCell align="left">Họ đệm</TableCell>
                                <TableCell align="left">Tên</TableCell>
                                <TableCell align="left">Tuổi</TableCell>
                                <TableCell align="left">Chức vụ</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody style={{ fontSize: '1rem' }}>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <AdminTableRow key={row.id} row={row} refech={fetchProductData} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* phân trang */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
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

export default AdminTable;
