export interface Order {
    id: number
    tableId: number
    subtotal?: number
    taxTotal?: number
    total?: number
    status?: string
    email?: string
    createdAt?: Date
    updatedAt?: Date
}
