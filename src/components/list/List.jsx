import React from 'react';
import Badge from '../badge/Badge';
import Icon from '../icon/Icon';

import './List.scss';

const List = ({ items, isRemovable, onClick }) => {
    return (
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li className={item.active ? 'active' : null} key={index}>
                        {
                            item.iconUrl ?
                                <Icon iconUrl={item.iconUrl} alt={item.text} /> : <Badge color={item.color} />
                        }
                        <span>{item.text}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default List;