import React, { useState } from 'react';
import ListBase from '../components/list/List';
import { appApi } from '../services/api';


const List = ({ list, setList, isRemovable }) => {

    const [isLoadingOnRemove, setIsLoadingOnRemove] = useState(false);

    const onRemoveList = (item) => {
        const definetelyDelete = window.confirm("Are you really want to delete item ? ");
        if (definetelyDelete) {
            setIsLoadingOnRemove(true);
            appApi.deleteList(item.id).then(() => {
                const l = list.filter((listItem) => {
                    return listItem.id !== item.id;
                });
                setList(l);
            }).finally(() => {
                setIsLoadingOnRemove(false);
            });
        }
    }


    return <ListBase
        items={list}
        isRemovable={isRemovable}
        onRemove={onRemoveList}
        isLoading={isLoadingOnRemove}
    />
}

export default List;