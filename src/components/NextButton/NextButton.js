// import classNames from 'classnames/bind';
import React from 'react';
// import styles from './NextButton.module.scss';

// const cx = classNames.bind(styles);

function NextButton(props) {
    const { className, style, onClick } = props;
    return (
        <img
            className={className}
            style={{ ...style, display: 'block', right: '-60px' }}
            onClick={onClick}
            src="https://assets.website-files.com/63708df071bc73798fae96ee/6374a55534cf1a566f9175c3_prv-image.svg"
            alt="icon right"
        />
    );
}

export default NextButton;
