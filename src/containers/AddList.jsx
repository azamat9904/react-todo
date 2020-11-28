import React, { useState, useEffect } from 'react';
import AddListBase from '../components/add-list/AddList';
import { connect } from 'react-redux';
import listActions from '../redux/actions/list';
import colorActions from '../redux/actions/colors';

const AddList = ({
    addListSuccess,
    colors,
    selectedColor,
    addList,
    setSelectedColor,
    isLoading
}) => {
    const [isVisable, setIsVisable] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onAddList = () => {
        if (!inputValue.trim()) {
            alert("Введите значене");
            return;
        }
        const newListItem = { name: inputValue, colorId: selectedColor.id }
        addList(newListItem);
    }

    useEffect(() => {
        if (addListSuccess) {
            onClose();
        }
        
    }, [addListSuccess]);


    const visableHandler = (isVisable) => {
        if (!isVisable) {
            onClose();
            return;
        }
        setIsVisable(true);
    }

    const onClose = () => {
        setInputValue("");
        setIsVisable(false);
        setSelectedColor(colors[0]);
    }

    return <AddListBase
        isVisable={isVisable}
        setIsVisable={visableHandler}
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAddList={onAddList}
        isLoading={isLoading}
    />
}

const mapStateToprops = (state) => {
    return {
        colors: state.colorState.colors,
        list: state.listState.list,
        selectedColor: state.colorState.selectedColor,
        addListSuccess: state.listState.addListSuccess,
        isLoading: state.listState.isLoading
    }
}

export default connect(mapStateToprops, { ...listActions, ...colorActions })(AddList);