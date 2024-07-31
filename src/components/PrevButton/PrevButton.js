import React from 'react';
// const cx = classNames.bind(styles);

function PrevButton(props) {
    const { className, style, onClick } = props;
    return (
        <img
            className={className}
            style={{ ...style, display: 'block', left: '-60px' }}
            onClick={onClick}
            src="https://assets.website-files.com/63708df071bc73798fae96ee/6374a52d31e71878dd537a12_next-image.svg"
            alt="icon left"
        />
    );
}

export default PrevButton;
