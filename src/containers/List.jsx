import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ListBase from '../components/list/List';
import listActions from '../redux/actions/list';
import listSvg from '../assets/img/list.svg';

const mainItem =
{
    id: -1,
    iconUrl: listSvg,
    name: "Все задачи",
};


const List = ({
    list,
    isRemovable,
    selectedListId,
    setSelectedListId,
    removeList,
    isLoading,
    ...props
}) => {


    const onRemoveList = (item) => {
        const definetelyDelete = window.confirm("Are you really want to delete item ? ");
        if (definetelyDelete) {
            removeList(item.id);
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

    return <>
        {
            isRemovable ? <ListBase
                items={list}
                isRemovable={isRemovable}
                onRemove={onRemoveList}
                isLoading={isLoading}
                onItemClick={onItemClickHandler}
                selectedListId={selectedListId}
            /> : <ListBase
                    items={[mainItem]}
                    isRemovable={isRemovable}
                    onItemClick={onItemClickHandler}
                    selectedListId={selectedListId}
                />
        }
    </>

}

const mapStateToProps = (state) => {
    return {
        list: state.listState.list,
        selectedListId: state.listState.selectedListId
    }
}

export default connect(mapStateToProps, { ...listActions })(withRouter(List));