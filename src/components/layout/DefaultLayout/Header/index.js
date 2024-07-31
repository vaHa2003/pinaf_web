import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IconLogin, IconLoginHome, IconLogout } from '~/components/Icons';
import React, { useContext, useEffect, useState } from 'react';
import ModalLogin from '~/page/ModalLogin/ModalLogin';
import { IconNavbar } from '~/asset/imgs';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhoto, selectUserName, setUserLogOut, setUserLogin } from '~/store/user/userSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '~/Firebase/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '~/context/Cart';

const cx = classNames.bind(styles);

function Header() {
    // trạng thái modal login
    const [modalLogin, setModalLogin] = useState(false);

    const { cartItems } = useContext(CartContext);

    // trạng thái navbar responsive
    const [active, setActive] = useState(cx('nav__menu'));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    console.log('vietanh ~ file: index.js:32 ~ Header ~ userName:', userName);
    const userPhoto = useSelector(selectPhoto);
    console.log('vietanh ~ file: index.js:34 ~ Header ~ userPhoto:', userPhoto);

    useEffect(() => {
        // onAuthStateChanged: hàm lưu trạng thái của tài khoản khi đăng nhập
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                handleSetUser(user);
                navigate('/');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [userName]); // userName xem có sự thay đổi không khi F5

    // hàm đăng nhập
    const handleSetUser = (user) => {
        dispatch(
            setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }),
        );
    };

    // hàm đăng xuất
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setUserLogOut());
                navigate('/');
            })
            .catch((error) => {
                alert(error.message);
            });

        localStorage.removeItem('token');
    };

    // hàm toggle navbar mobile
    const navToogle = () => {
        if (active === cx('nav__menu')) {
            setActive(cx('nav__menu', 'nav__active'));
        } else {
            setActive(cx('nav__menu'));
        }
    };

    const handleModal = () => {
        setModalLogin(true);
    };

    // token trong local storage
    const token = localStorage.getItem('token');

    const toogleNavbar = () => {
        if ('nav__active') {
            setActive(cx('nav__menu'));
        }
    };

    return (
        <React.Fragment>
            <div className={cx('header')}>
                <div className={cx('nav')}>
                    <div className={cx('header__icon-nav')}>
                        <div onClick={navToogle} style={{ color: '#333' }}>
                            <IconNavbar />
                        </div>
                    </div>
                    <div className={cx('header__container_logo')}>
                        <Link to="/">
                            <img
                                src="https://assets.website-files.com/63708df071bc73798fae96ee/6371d7efa81428f277b0deec_logo.png"
                                alt="header logo"
                            />
                        </Link>
                    </div>

                    <ul className={cx(active)}>
                        <li className={cx('close__icon')} onClick={toogleNavbar}>
                            &times;
                        </li>
                        <li className={cx('nav__item')}>
                            <Link className={cx('nav__link')} to="/">
                                HOME
                            </Link>
                        </li>

                        <li className={cx('nav__item')}>
                            <Link className={cx('nav__link')} to="/shop">
                                SHOP
                            </Link>
                        </li>

                        <li className={cx('nav__item')}>
                            <Link className={cx('nav__link')} to="/page">
                                PAGE
                            </Link>
                        </li>

                        <li className={cx('nav__item')}>
                            <Link className={cx('nav__link')} to="/blog">
                                BLOG
                            </Link>
                        </li>

                        <li className={cx('nav__item')}>
                            <Link className={cx('nav__link')} to="/contact">
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                    <div className={cx('header__container_cart')}>
                        <div className={cx('header__container_cart-po')}>
                            <Tippy
                                content="log in"
                                placement={'bottom'}
                                nteractive={true}
                                interactiveBorder={20}
                                delay={100}
                            >
                                <div className={cx('header__container_cart-login')} onClick={handleModal}>
                                    {!userName && !token ? (
                                        <IconLogin />
                                    ) : userPhoto ? (
                                        <img
                                            src={userPhoto}
                                            alt={userName}
                                            style={{ width: '30px', height: 'auto', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <IconLoginHome />
                                    )}
                                </div>
                            </Tippy>

                            <Tippy
                                content="log out"
                                placement={'bottom'}
                                nteractive={true}
                                interactiveBorder={20}
                                delay={100}
                            >
                                <div className={cx('header__container_cart-login')} onClick={handleSignOut}>
                                    <Link to="/" style={{ color: '#333' }}>
                                        <IconLogout />
                                    </Link>
                                </div>
                            </Tippy>

                            <Tippy
                                content="cart"
                                placement={'bottom'}
                                nteractive={true}
                                interactiveBorder={20}
                                delay={100}
                            >
                                <Link to="/cart">
                                    <img
                                        id="myButton"
                                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6371fca3352e282d8446f624_icon.svg"
                                        alt="icon cart"
                                        className={cx('header__container_icon')}
                                    />
                                </Link>
                            </Tippy>
                            <div className={cx('header__container_cart-number')}>
                                <span>{cartItems.length ? cartItems.length : 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal login */}
            {userName || token
                ? ''
                : modalLogin && <ModalLogin openModal={modalLogin} closeModal={() => setModalLogin(false)} />}

            <ToastContainer />
        </React.Fragment>
    );
}
export default Header;
