import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

function Wrapper() {
    const [wrapper, setWrapper] = useState(true);

    const handleWrapper = () => {
        setWrapper(false);
    };

    return (
        <React.Fragment>
            {wrapper && (
                <div className={cx('wrapper')}>
                    <div className={cx('wrapper__content')}>
                        <h1 className={cx('warpper__content-center')}>
                            We ship nationwide. 20-day return policy. Free standard shipping on orders over $150.
                        </h1>
                        <span className={cx('warpper__content-icon_close')} onClick={handleWrapper}>
                            &times;
                        </span>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default Wrapper;
