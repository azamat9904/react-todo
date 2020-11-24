import React, { useState, useEffect } from 'react';
import AddListBase from '../components/add-list/AddList';
import { appApi } from '../services/api';

const AddList = ({ colors, list, setList }) => {

    const [isVisable, setIsVisable] = useState(false);
    const [selectedColor, setSelectedColor] = useState();
    const [inputValue, setInputValue] = useState('');
    const [isLoadingOnAdd, setIsLoadingOnAdd] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors))
            setSelectedColor(colors[0]);

    }, [colors]);

    const onAddList = () => {
        if (!inputValue.trim()) {
            alert("Введите значене");
            return;
        }
        const newListItem = { name: inputValue, colorId: selectedColor.id, active: false }
        setIsLoadingOnAdd(true);
        appApi.addList(newListItem).then((item) => {
            item.color = colors.find((color) => color.id === item.colorId).name;
            const newList = [...list, item];
            setList(newList);
            onClose();
        }).finally(() => {
            setIsLoadingOnAdd(false);
        });
    }

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
        isLoading={isLoadingOnAdd}
    />
}

export default AddList;