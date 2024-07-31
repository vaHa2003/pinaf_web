import React, { useContext } from 'react';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { ModalContext } from '~/context/ProductModal';
import callApi from '~/service';
import { ToastContainer, toast } from 'react-toastify';
import UsersModalContext from '~/context/UserModalContext';

function AdminTableRow({ row, refech }) {
    const { setInitDataModal } = useContext(UsersModalContext);

    const modal = useContext(ModalContext);

    const handleEdit = () => {
        setInitDataModal(row);
        modal.handleClickAddOpen();
    };

    // chức xoá Users
    const handleDeleleUser = async () => {
        await callApi.DeleteUsers(row.id);
        const statusCode = 200;
        if (statusCode === 200) {
            toast.success('Xoá thành công', {
                position: 'top-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
        } else {
            toast.error('Xoá không thành công', {
                position: 'top-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
            });
        }
        refech();
    };

    return (
        <React.Fragment>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child  th': { border: 0 } }}>
                <TableCell align="left" sx={{ fontFamily: 'SF Mono', color: 'red' }}>
                    {row.manv}
                </TableCell>

                <TableCell align="left" sx={{ fontFamily: 'SF Mono' }}>
                    {row.HoDem}
                </TableCell>
                <TableCell align="left" sx={{ fontFamily: 'SF Mono' }}>
                    {row.ten}
                </TableCell>
                <TableCell align="left" sx={{ fontFamily: 'SF Mono' }}>
                    {row.tuoi}
                </TableCell>
                <TableCell align="left" sx={{ fontFamily: 'SF Mono' }}>
                    {row.chucvu}
                </TableCell>

                {/* icon edit */}
                <TableCell align="left">
                    <Tooltip
                        title="Sửa nhân viên"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    color: '#fff',
                                    backgroundColor: '#296152',
                                    marginTop: '1px',
                                    fontFamily: 'SF Mono',
                                },
                            },
                        }}
                    >
                        <IconButton aria-label="edit" sx={{ color: '#ffa300' }} onClick={handleEdit}>
                            <ModeEditOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    {/* icon delete */}
                    <Tooltip
                        title="Xoá nhân viên"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    color: '#fff',
                                    backgroundColor: '#296152',
                                    marginTop: '1px',
                                    fontFamily: 'SF Mono',
                                },
                            },
                        }}
                    >
                        <IconButton aria-label="delete" sx={{ color: 'red' }} onClick={handleDeleleUser}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <ToastContainer />
        </React.Fragment>
    );
}

export default AdminTableRow;
