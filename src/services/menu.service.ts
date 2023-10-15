import { api } from "../utils/apiClient";
import { Menu } from "../models/Menu";

export const fetchMenu = async () : Promise<Menu[]> => {
    return (await api.get('/menu?availableOnly=true')).data;
}