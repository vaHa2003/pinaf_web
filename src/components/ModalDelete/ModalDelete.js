import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { ModalContext, ProductModal } from '~/context/ProductModal';

function ModalDelete({ id, fetchProductData }) {
    const modal = useContext(ModalContext);

    const [idModalDelete, setIdModalDelete] = useState(null);

    // Cập nhật giá trị id khi prop thay đổi
    useEffect(() => {
        setIdModalDelete(id);
    }, [id]);

    // chức năng xoá user của admin
    const handleDeleteUser = async (id) => {
        setIdModalDelete(id);
        modal.handleClose();
        // FIXME :chưa truyền được id lên modal
        // await AdminApi.deleteByID(data.id);
        // fetchProductData();
    };

    return (
        <ProductModal>
            <React.Fragment>
                <Dialog open={modal.open} onClose={modal.handleClose}>
                    <ClearRoundedIcon
                        sx={{
                            width: '28px',
                            height: '28px',
                            textAlign: 'right',
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '10px',
                            top: '10px',
                        }}
                        onClick={modal.handleClose}
                    />
                    <DeleteIcon
                        sx={{
                            color: 'red',
                            borderRadius: '50%',
                            padding: '10px 10px',
                            margin: '0 auto',
                            width: '50px',
                            height: '50px',
                            backgroundColor: '#e7e6e6',
                            marginTop: '52px',
                        }}
                    />
                    <DialogTitle
                        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'SF Mono' }}
                    >
                        Bạn có chắc không?
                    </DialogTitle>
                    <DialogTitle
                        sx={{
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            padding: '10px 36px',
                            fontFamily: 'SF Mono',
                            marginBottom: '8px',
                        }}
                    >
                        Bạn có thực sự muốn xóa những bản ghi này không? Quá trình này không thể được hoàn tất.
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={modal.handleClose}
                            sx={{
                                color: '#fff',
                                background: '#555',
                                '&:hover': {
                                    color: '#fff',
                                    background: '#555',
                                },
                                fontFamily: 'SF Mono',
                            }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={() => handleDeleteUser(id)}
                            type="submit"
                            sx={{
                                color: '#fff',
                                background: 'red',
                                '&:hover': {
                                    color: '#fff',
                                    background: 'red',
                                },
                                fontFamily: 'SF Mono',
                            }}
                        >
                            Xoá
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ProductModal>
    );
}

export default ModalDelete;
