import { AxiosResponse } from 'axios'
import { api } from "../utils/apiClient";
import { Menu } from "../models/Menu";

export const fetchMenu = async () : Promise<Menu[]> => {
    return (await api.get('/menu?onlyAvailable=true')).data;
}

export const fetchMenuAll = async () : Promise<Menu[]> => {
    return (await api.get('/menu')).data;
}

export const addMenuItem = async (item: Menu) : Promise<Menu> => {
    return (await api.post('/admin/menu', item)).data;
}

export const uploadImage = async (formData: FormData) : Promise<AxiosResponse> => {
    return await api.post("/admin/menu/image/upload", formData, { headers: {"Content-Type": "multipart/form-data"}})
}