import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import ListBase from '../components/list/List';
import { appApi } from '../services/api';


const List = ({
    list,
    setList,
    isRemovable,
    selectedListId,
    setSelectedListId,
    ...props
}) => {


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

    const onItemClickHandler = (id) => {
        setSelectedListId(id);
        if (id === 'ALL_TASKS') {
            props.history.push("/");
            return;
        }
        props.history.push(`/${id}`);
    }

    return <ListBase
        items={list}
        isRemovable={isRemovable}
        onRemove={onRemoveList}
        isLoading={isLoadingOnRemove}
        onItemClick={onItemClickHandler}
        selectedListId={selectedListId}
    />
}

export default withRouter(List);