import React from 'react';

const Icon = ({ iconUrl, alt, click }) => {
    return (
        <i onClick={click}>
            <img src={iconUrl} alt={alt} />
        </i>
    )
}

export default Icon;