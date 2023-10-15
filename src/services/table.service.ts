import { api } from "../utils/apiClient";
import { Table } from "../models/Table";

export const fetchTables = async (): Promise<Table[]> => {
    return (await api.get("/table")).data;
}