import React from 'react';
import './List.scss';

const List = ({ items }) => {
    return (
        <ul className="list">
            {
                items.map((item, index) => (
                    <li className={item.active ? 'active' : null} key={index}>
                        {
                            item.iconUrl ? <i>
                                <img src={item.iconUrl} alt="listSvg" />
                            </i> : <div className={['badge', `badge--${item.color}`].join(" ")}></div>
                        }
                        <span>{item.text}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default List;