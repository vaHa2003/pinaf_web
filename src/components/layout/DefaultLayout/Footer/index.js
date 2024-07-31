import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import styles from './Footer.module.scss';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Footer() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('pianf', 'template_z5ksz5e', form.current, {
                publicKey: 'P5qFAOhO02BtHKk_G',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div>
            <footer className={cx('footer')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('footer-col')}>
                            <img
                                src="https://assets.website-files.com/63708df071bc73798fae96ee/6371d7efa81428f277b0deec_logo.png"
                                alt=" img logo"
                            />
                            <ul>
                                <li>
                                    <a href="/" className={cx('footer__logo')}>
                                        With Pinaf, you can easily <br /> create professional-looking <br /> flowers
                                        with a variety <br /> of different layouts.
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <img
                                            style={{ margin: '30px 0' }}
                                            src="https://assets.website-files.com/63708df071bc73798fae96ee/6375c8b45b8d27515843a88f_payment.png"
                                            alt="img tickets"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <p>Powered by Webflow</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('footer-col')}>
                            <h4>Contact Info</h4>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=258C,+South+City,+Main+Town+Brolex+Tower,+New+York"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        258C, South City, Main Town Brolex Tower, New York
                                    </a>
                                </li>
                                <li>
                                    <a href="/" style={{ fontWeight: '500', color: '#000' }}>
                                        Phone/Web:
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+12345678901">+12 345-678-901 www.panaf.com</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('footer-col')}>
                            <h4>Information</h4>
                            <ul>
                                <li>
                                    <a href="/">About</a>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li>
                                    <a href="/">Style Guide</a>
                                </li>
                                <li>
                                    <a href="/">Change Log</a>
                                </li>
                                <li>
                                    <a href="/">License</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('footer-col')}>
                            <h4>Newsletter</h4>
                            <div className={cx('social-links')}>
                                <form className={cx('social-form')} ref={form} onSubmit={sendEmail}>
                                    <input
                                        type="email"
                                        name="email"
                                        id=""
                                        placeholder="Enter Your Name"
                                        className={cx('social-input')}
                                        required
                                    />
                                    <button type="submit" className={cx('social-btn')} value="Send">
                                        Subscribe
                                    </button>
                                </form>

                                <div className={cx('social-icon')}>
                                    <img
                                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6375d07c09bb2fe383381b03_2.svg"
                                        alt="img facebook"
                                    />
                                    <img
                                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6375d07c29026507d96a1e6c_3.svg"
                                        alt="img twitter"
                                    />
                                    <img
                                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6375d07c953f04c48b6864ca_4.svg"
                                        alt="img printerest"
                                    />
                                    <img
                                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6375d07b28bf0d7a15defa91_1.svg"
                                        alt="img instagram"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={cx('footer__link')} style={{ textAlign: 'center', marginTop: '28px' }}>
                        © 2022 <a href="/">Brandbes.</a> All rights reserved
                    </p>
                </div>
                <div className={cx('footer__bottom')}>
                    <img
                        src="https://assets.website-files.com/63708df071bc73798fae96ee/6379f2dbab3450a56a098a9d_design-image.png"
                        alt=""
                        className={cx('footer__bottom-img')}
                    />
                </div>
            </footer>
        </div>
    );
}

export default Footer;
