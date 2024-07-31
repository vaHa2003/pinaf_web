import Header from './Header';
import Wrapper from './Wrapper';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { BackTop } from '~/components/Icons';
import { useEffect, useState } from 'react';
import Chatbot from '~/components/Chatbot/Chatbot';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    // trạng thái của nút back to top
    const [backTop, setBackTop] = useState(false);

    useEffect(() => {
        const handleBacktop = () => {
            if (window.scrollY > 200) {
                setBackTop(true);
            } else {
                setBackTop(false);
            }
        };
        window.addEventListener('scroll', handleBacktop);
        // clean up
        return () => {
            window.removeEventListener('scroll', handleBacktop);
        };
    }, []);

    return (
        <div>
            <Wrapper />
            <Header />

            <div className="container">
                <div className="content">{children}</div>
            </div>

            {/* backtop */}
            {backTop && (
                <button className={cx('backtop')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <BackTop />
                </button>
            )}

            <Chatbot />
        </div>
    );
}

export default DefaultLayout;
