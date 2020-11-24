import axios from '../core/axios';

export const appApi = {
    getList: () => {
        return axios.get('/lists?_expand=color').then(response => response.data);
    },
    getColors: () => {
        return axios.get('/colors').then(((response) => response.data));
    },
    addList: (newListItem) => {
        return axios.post('/lists', newListItem).then((response) => response.data);
    },
    deleteList: (id) => {
        return axios.delete('/lists/' + id).then(response => response.data);
    }
}
