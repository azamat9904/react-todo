import axios from '../core/axios';

export const appApi = {
    getList: () => {
        return axios.get('/lists?_expand=color&_embed=tasks').then(response => response.data);
    },
    getColors: () => {
        return axios.get('/colors').then(((response) => response.data));
    },
    addList: (newListItem) => {
        return axios.post('/lists', newListItem).then((response) => response.data);
    },
    deleteList: (id) => {
        return axios.delete('/lists/' + id).then(response => response.data);
    },
    getListTasks: (listId) => {
        return axios.get(`/lists/${listId}?_embed=tasks`).then(response => response.data);
    },
    updateList: (id, name) => {
        return axios.patch('/lists/' + id, { name: name }).then(response => response.data);
    },
    checkTask: (id, status) => {
        return axios.patch('/tasks/' + id, { completed: status }).then(response => response.data);
    },
    addTask: (task) => {
        return axios.post('/tasks', task).then((response) => response.data);
    },
    deleteTask: (id) => {
        return axios.delete('/tasks/' + id).then((response) => response.data);
    },
    updateTaskText: (taskId, text) => {
        return axios.patch('/tasks/' + taskId, { text }).then((response) => response.data);
    }
}
