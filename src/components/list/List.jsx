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
    isLoading,
    onItemClick,
    selectedListId
}) => {
    return (
        <ul className="list" onClick={onClick ? onClick : null}>
            {
                items.map((item, index) => (
                    <li className={selectedListId === item.id ? 'active' : null} key={index} onClick={onItemClick ? () => onItemClick(item.id) : null}>
                        {
                            item.iconUrl ?
                                <Icon iconUrl={item.iconUrl} alt={item.name} /> : <Badge color={item.color} />
                        }
                        <span>{item.name} {item.tasks ? `(${item.tasks.length})` : isRemovable ? '0' : null}</span>
                        {
                            isRemovable && !isLoading && <div className="list__remove-icon">
                                <Icon iconUrl={removeIconUrl} alt="Remove Icon" click={() => onRemove(item)} />
                            </div>
                        }
                        {
                            isRemovable && isLoading && <div className="list__load-icon">
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