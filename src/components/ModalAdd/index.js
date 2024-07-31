import React, { useContext } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ModalContext, ProductModal } from '~/context/ProductModal';
import { AdminApi } from '~/api/ProductApi';
import ProductModalContext from '~/context/UserModalContext';
import AddIcon from '@mui/icons-material/Add';

// Define validation schema using Yup
const validationSchema = yup.object({
    manv: yup
        .string()
        .required('Mã nhân viên không được bỏ trống')
        .matches(/^[a-zA-Z0-9]+$/, 'Mã nhân viên chỉ chứa chữ và số'),
    HoDem: yup.string().required('Họ đệm không được bỏ trống'),
    ten: yup.string().required('Tên không được bỏ trống'),
    tuoi: yup
        .number()
        .required('Tuổi không được bỏ trống')
        .min(18, 'Tuổi phải lớn hơn hoặc bằng 18')
        .max(65, 'Tuổi phải nhỏ hơn hoặc bằng 65'),
    chucvu: yup.string().required('Chức vụ không được bỏ trống'),
});

function ModalAdd({ data, getData }) {
    const { initDataModal, fetchProductData } = useContext(ProductModalContext);

    const value = useContext(ModalContext);

    const textFieldStyle = {
        fontFamily: 'SF Mono',
        fontSize: '16px',
    };

    // quản lý formik và yup
    const formik = useFormik({
        initialValues: {
            id: initDataModal.id ?? '',
            manv: initDataModal.manv ?? '',
            HoDem: initDataModal.HoDem ?? '',
            ten: initDataModal.ten ?? '',
            tuoi: initDataModal.tuoi ?? '',
            chucvu: initDataModal.chucvu ?? '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            if (values.id) {
                await handleEditUsers({
                    id: values.id,
                    manv: values.manv,
                    HoDem: values.HoDem,
                    ten: values.ten,
                    tuoi: values.tuoi,
                    chucvu: values.chucvu,
                });
            } else {
                await handleAddUsers({
                    manv: values.manv,
                    HoDem: values.HoDem,
                    ten: values.ten,
                    tuoi: values.tuoi,
                    chucvu: values.chucvu,
                });
            }
            resetForm();
            value.handleAddClose();
            await fetchProductData();
        },
    });

    // hàm gọi api với add Users
    const handleAddUsers = async ({ manv, HoDem, ten, tuoi, chucvu }) => {
        await AdminApi.create({ manv, HoDem, ten, tuoi, chucvu });
    };

    // hàm gọi api với edit Users
    const handleEditUsers = async ({ id, manv, HoDem, ten, tuoi, chucvu }) => {
        await AdminApi.updateByID(id, { manv, HoDem, ten, tuoi, chucvu });
    };

    return (
        <ProductModal>
            <React.Fragment>
                <Dialog open={value.modalAdd} onClose={value.handleAddClose}>
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
                        onClick={value.handleAddClose}
                    />

                    <div style={{ textAlign: 'center' }}>
                        <AddIcon
                            sx={{
                                color: '#296253',
                                borderRadius: '50%',
                                padding: '10px 10px',
                                margin: '0 auto',
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#e7e6e6',
                                marginTop: '40px',
                            }}
                        />
                        <EditIcon
                            sx={{
                                color: '#ffa300',
                                borderRadius: '50%',
                                padding: '10px 10px',
                                margin: '0 auto',
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#e7e6e6',
                                marginTop: '40px',
                            }}
                        />
                    </div>

                    {/* Formik form handling */}
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="manv"
                                name="manv"
                                label="Mã nhân viên"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.manv}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.manv && Boolean(formik.errors.manv)}
                                helperText={formik.touched.manv && formik.errors.manv}
                            />

                            <TextField
                                margin="dense"
                                id="HoDem"
                                name="HoDem"
                                label="Họ Đệm"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.HoDem}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.HoDem && Boolean(formik.errors.HoDem)}
                                helperText={formik.touched.HoDem && formik.errors.HoDem}
                            />

                            <TextField
                                margin="dense"
                                id="ten"
                                name="ten"
                                label="Tên"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.ten}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ten && Boolean(formik.errors.ten)}
                                helperText={formik.touched.ten && formik.errors.ten}
                            />

                            <TextField
                                margin="dense"
                                id="tuoi"
                                name="tuoi"
                                label="Tuổi"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.tuoi}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tuoi && Boolean(formik.errors.tuoi)}
                                helperText={formik.touched.tuoi && formik.errors.tuoi}
                            />

                            <TextField
                                margin="dense"
                                id="chucvu"
                                name="chucvu"
                                label="Chức vụ"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.chucvu}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.chucvu && Boolean(formik.errors.chucvu)}
                                helperText={formik.touched.chucvu && formik.errors.chucvu}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button
                                onClick={value.handleAddClose}
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
                                type="submit"
                                sx={{
                                    color: '#fff',
                                    background: '#ffa300',
                                    '&:hover': {
                                        color: '#fff',
                                        background: '#ffa300',
                                    },
                                    fontFamily: 'SF Mono',
                                }}
                            >
                                Thêm
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </ProductModal>
    );
}

export default ModalAdd;
