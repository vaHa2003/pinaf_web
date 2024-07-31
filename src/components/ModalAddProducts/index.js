import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PostApi } from '~/api/ProductApi';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContext, ProductModal } from '~/context/ProductModal';
import ProductModalContext from '~/context/ProductsModalContext';

const validationSchema = yup.object({
    title: yup.string().required('Tên sản phẩm không được bỏ trống'),
    price: yup.string().required('Giá sản phẩm không được bỏ trống'),
    description: yup.string().required('Mô tả không được bỏ trống'),
    ton_kho: yup.string().required('Tồn kho không được bỏ trống'),
    da_ban: yup.string().required('Đã bán không được bỏ trống'),
    tinh_trang: yup.string().required('Tình trạng không được bỏ trống'),
});

// style textfile
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function ModalAddProducts({ data, refetch }) {
    const value = useContext(ModalContext);

    const { initDataProducts } = useContext(ProductModalContext);

    const [imgProducts, setImgProducts] = useState(null);
    const [fileImg, setFileImg] = useState(null);

    // lưu độ dài của data
    const [idDataLength, setIdDataLength] = useState(data.length);
    useEffect(() => {
        setIdDataLength(data.length);
    }, [data]);

    // hàm lấy file ảnh chuyển thành base 64
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // lấy file ảnh tải lên
        setFileImg(file);
        if (file) {
            const reader = new FileReader(); // Tạo một FileReader
            reader.onloadend = () => {
                // Xử lý khi FileReader đọc xong file
                setImgProducts(reader.result); // Lấy URL của file ảnh
            };
            reader.readAsDataURL(file); // Đọc file ảnh và chuyển đổi thành URL
        }
    };

    // hàm xoá img
    const handleRemoveProductImage = () => {
        setImgProducts(null);
    };

    const textFieldStyle = {
        fontFamily: 'SF Mono',
        fontSize: '16px',
    };

    // quản lý formik và yup
    const formik = useFormik({
        initialValues: {
            id: initDataProducts.id ?? '',
            title: initDataProducts.title ?? '',
            imgUrl: initDataProducts.imgUrl ?? '',
            price: initDataProducts.price ?? '',
            description: initDataProducts.description ?? '',
            ton_kho: initDataProducts.ton_kho ?? '',
            da_ban: initDataProducts.da_ban ?? '',
            tinh_trang: initDataProducts.tinh_trang ?? '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            setImgProducts(null);
            setFileImg(null);
            if (values.id) {
                await handleUpdateProducts({
                    id: values.id,
                    title: values.title,
                    imgUrl: values.imgUrl,
                    price: values.price,
                    description: values.description,
                    ton_kho: values.ton_kho,
                    da_ban: values.da_ban,
                    tinh_trang: values.tinh_trang,
                });
            } else {
                await handleAddProduct({
                    title: values.title,
                    imgUrl: values.imgUrl,
                    price: values.price,
                    description: values.description,
                    ton_kho: values.ton_kho,
                    da_ban: values.da_ban,
                    tinh_trang: values.tinh_trang,
                });
            }
            resetForm();
            value.handleAddClose();
            await refetch();
        },
    });

    // hàm thêm sản phẩm
    const handleAddProduct = async ({ id, title, imgUrl, price, description, ton_kho, da_ban, tinh_trang }) => {
        await PostApi.create({
            id: idDataLength + 2,
            title,
            price,
            description,
            ton_kho,
            da_ban,
            tinh_trang,
            imgUrl: imgProducts,
        });
    };

    // hàm edit sản phẩm
    const handleUpdateProducts = async ({ id, title, imgUrl, price, description, ton_kho, da_ban, tinh_trang }) => {
        await PostApi.updateByID(id, {
            title,
            price,
            description,
            ton_kho,
            da_ban,
            tinh_trang,
            imgUrl: imgProducts,
        });
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
                                id="title"
                                name="title"
                                label="Tên sản phẩm"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    background: '#296253',
                                    marginTop: '20px',
                                    '&:hover': {
                                        boxShadow: 'none',
                                        background: '#296253',
                                    },
                                    '&:active': {
                                        boxShadow: 'none',
                                        background: '#296253',
                                    },
                                }}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                            </Button>

                            {/* hiển thị ảnh */}
                            <div style={{ position: 'relative' }}>
                                {imgProducts && (
                                    <img
                                        src={imgProducts}
                                        alt={imgProducts}
                                        style={{ width: '50%', height: 'auto', marginTop: '40px' }}
                                    />
                                )}
                                {imgProducts && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            color: 'red',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleRemoveProductImage}
                                    >
                                        <CloseIcon />
                                    </div>
                                )}
                                <div>
                                    {fileImg && <p style={{ fontSize: '1rem', color: '#296253' }}>{fileImg.name}</p>}
                                </div>
                                {initDataProducts && (
                                    <img
                                        src={initDataProducts.imgUrl}
                                        alt={initDataProducts.imgUrl}
                                        style={{ width: '36%', height: 'auto' }}
                                    />
                                )}
                            </div>
                            {formik.touched.imgUrl && formik.errors.imgUrl && (
                                <div style={{ color: 'red', fontSize: '16px' }}>{formik.errors.imgUrl}</div>
                            )}

                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="Giá sản phẩm"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />

                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Miêu tả sản phẩm"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />

                            <TextField
                                margin="dense"
                                id="ton_kho"
                                name="ton_kho"
                                label="Tồn kho sản phẩm"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.ton_kho}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ton_kho && Boolean(formik.errors.ton_kho)}
                                helperText={formik.touched.ton_kho && formik.errors.ton_kho}
                            />

                            <TextField
                                margin="dense"
                                id="da_ban"
                                name="da_ban"
                                label="Đã bán"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.da_ban}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.da_ban && Boolean(formik.errors.da_ban)}
                                helperText={formik.touched.da_ban && formik.errors.da_ban}
                            />

                            <TextField
                                margin="dense"
                                id="tinh_trang"
                                name="tinh_trang"
                                label="Tình trạng sản phẩm"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: textFieldStyle }}
                                value={formik.values.tinh_trang}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tinh_trang && Boolean(formik.errors.tinh_trang)}
                                helperText={formik.touched.tinh_trang && formik.errors.tinh_trang}
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

export default ModalAddProducts;
