import React, { useContext, useEffect, useState } from 'react';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import classNames from 'classnames/bind';
import styles from './ProductTableRow.module.scss';
import { ModalContext } from '~/context/ProductModal';
import callApi from '~/service';
import ProductModalContext from '~/context/ProductsModalContext';
const cx = classNames.bind(styles);

function ProductTableRow({ row, refetch }) {
    const modal = useContext(ModalContext);

    const { fetchListProducts, initDataProducts, setInitDataProducts } = useContext(ProductModalContext);

    const handleDeleteProducts = async (id) => {
        await callApi.DeleteProducts(id);
        //FIXME:chưa fix được truyển id lên modal để xoá
        // modal.handleClickOpen();
        refetch();
    };

    const handleEditProducts = () => {
        setInitDataProducts(row);
        modal.handleClickAddOpen();
    };

    return (
        <React.Fragment>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child  th': { border: 0, marginBottom: '200px' } }}>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono', color: 'red' }}>
                    {row.id}
                </TableCell>

                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    {row.title}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    {row.imgUrl ? (
                        <img
                            src={row.imgUrl}
                            alt={row.imgUrl}
                            style={{
                                width: '50%',
                                height: 'auto',
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                            }}
                        />
                    ) : (
                        <img src="https://placehold.jp/200x200.png" alt="img ảnh placehold" />
                    )}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    {row.price}đ
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    <div className={cx('productpage__description')}>{row.description}</div>
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    {row.ton_kho}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    {row.da_ban}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'SF Mono' }}>
                    {row.tinh_trang}
                </TableCell>

                {/* icon edit */}
                <TableCell align="center">
                    <Tooltip
                        title="Sửa sản phẩm"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    color: '#fff',
                                    backgroundColor: '#296152',
                                    marginTop: '1px',
                                    fontFamily: 'SF Mono',
                                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                },
                            },
                        }}
                    >
                        <IconButton aria-label="edit" sx={{ color: '#ffa300' }} onClick={handleEditProducts}>
                            <ModeEditOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    {/* icon delete */}
                    <Tooltip
                        title="Xoá sản phẩm"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    color: '#fff',
                                    backgroundColor: '#296152',
                                    marginTop: '1px',
                                    fontFamily: 'SF Mono',
                                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                },
                            },
                        }}
                    >
                        <IconButton
                            aria-label="delete"
                            sx={{ color: 'red' }}
                            onClick={() => handleDeleteProducts(row.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>

            {/* <ModalDelete id={row.id} /> */}
        </React.Fragment>
    );
}

export default ProductTableRow;
