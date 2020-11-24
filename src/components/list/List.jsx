import React from 'react';
import Badge from '../badge/Badge';
import Icon from '../icon/Icon';
import removeIconUrl from '../../assets/img/remove.svg';
import loadingIconUrl from '../../assets/img/loader.svg';

import './List.scss';

const List = ({
    items,
    isRemovable,
    onClick,
    onRemove,
    isLoading
}) => {
    return (
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li className={item && item.active ? 'active' : null} key={index}>
                        {
                            item.iconUrl ?
                                <Icon iconUrl={item.iconUrl} alt={item.name} /> : <Badge color={item.color} />
                        }
                        <span>{item.name}</span>
                        {
                            isRemovable && !isLoading && <div className="list__remove-icon">
                                <Icon iconUrl={removeIconUrl} alt="Remove Icon" click={() => onRemove(item)} />
                            </div>
                        }
                        {
                            isRemovable && isLoading && <div className="list__remove-icon">
                                <Icon iconUrl={loadingIconUrl} alt="Loading Icon" />
                            </div>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default List;