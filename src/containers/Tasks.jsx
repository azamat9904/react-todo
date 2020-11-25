import React, { useEffect, useState, Fragment, useRef } from 'react';
import TasksBase from '../components/tasks/Tasks';
import Loader from '../components/loading/Loading';
import { appApi } from '../services/api';

const Tasks = ({ setSelectedListId, ...props }) => {
    const [listTasks, setListTasks] = useState();
    const [loading, setLoading] = useState(false);
    const [isVisable, setIsVisable] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const id = props.match.params.id;
        setLoading(true);
        appApi.getListTasks(id).then(tasks => {
            setListTasks(tasks);
            setSelectedListId(+id);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            props.history.push('/');
        })
    }, [props.location.pathname]);

    useEffect(() => {
        setInputValue(listTasks && listTasks.name);
    }, [listTasks]);

    const setIsVisableHandler = () => {
        setIsVisable(!isVisable);
    };

    const checkedHandler = (taskId, status) => {
        appApi.checkTask(taskId, status).then(() => {
            const remainedTasks = listTasks.tasks.filter((listItem) => {
                if (listItem.id !== taskId) {
                    return listItem;
                }
                listItem.completed = status;
                return listItem;
            });
            setListTasks({ ...listTasks, tasks: remainedTasks });
        });
    }

    const saveTitle = (e) => {
        if (e.keyCode === 13) {
            appApi.updateList(listTasks.id, inputValue).then(newList => {
                const list = { ...listTasks, name: newList.name };
                setListTasks(list);
            });
            setIsVisable(false);
        }
    }
    return <Fragment>
        {
            loading ? <Loader /> : <TasksBase
                item={listTasks}
                isVisable={isVisable}
                setIsVisable={setIsVisableHandler}
                inputValue={inputValue}
                setInputValue={setInputValue}
                saveTitle={saveTitle}
                checkedHandler={checkedHandler}
            />
        }
    </Fragment>
}

export default Tasks;