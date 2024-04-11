export interface Item {
    id: number;
    name: string;
    measurement_units?: string;
    code: string;
    description?: string;
}

export interface FetchItemsPayload {
    warehouseId: string;
    page: number;
    pageSize: number;
    token: string;
    itemName?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC" | undefined;
}