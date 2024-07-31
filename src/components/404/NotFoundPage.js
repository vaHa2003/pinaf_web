import React from 'react';
import styles from './404.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function NotFoundPage() {
    return (
        <React.Fragment>
            <div className={cx('container__404')}>
                <div className={cx('wrapper')}>
                    <div className={cx('wrapper__error')}>404</div>
                    <h1>Không tìm thấy nội dung 😓</h1>
                    <p className={cx('message')}>
                        URL của nội dung này đã bị thay đổi hoặc không còn tồn tại. Nếu bạn đang lưu URL này, hãy thử
                        truy cập lại từ trang chủ thay vì dùng URL đã lưu.
                        <br />
                    </p>
                    <span className={cx('message__link')}>👇</span>
                    <a href="/" className={cx('btn')}>
                        Truy cập trang chủ
                    </a>
                    <p className={cx('btn__product')}>© 2024 Pinaf.</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotFoundPage;
