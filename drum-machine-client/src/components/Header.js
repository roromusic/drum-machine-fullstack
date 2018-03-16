import React from 'react';

const headerStyle = {
    fontWeight: '700',
    fontSize: '36px',
    color: 'white',
    borderBottom: '6px solid #47cf73'
}

const Header = props => {
    const { title } = props;

    return (
        <header className="header" style={headerStyle}>
            <span>{title}</span>
        </header>
    );
}

export default Header;