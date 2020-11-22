import React from 'react';
import "./Badge.scss";

const Badge = ({ color, click, active }) => {

    const classes = ['badge', `badge--${color}`];

    if (active)
        classes.push('active');

    return (
        <div className={classes.join(" ")} onClick={click}></div>
    )
}

export default Badge;