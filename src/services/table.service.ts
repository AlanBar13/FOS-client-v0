import { api } from "../utils/apiClient";
import { Table } from "../models/Table";
import { AxiosResponse } from "axios";

export const fetchTables = async (): Promise<Table[]> => {
    return (await api.get("/table")).data;
}

export const createMultipleTables = async (amount: number, url: string): Promise<AxiosResponse> => {
    return await api.post(`/admin/table/multiple/${amount}`, {url});
}

export const deleteTables = async (): Promise<AxiosResponse> => {
    return await api.delete(`/admin/table/destroy`);
}