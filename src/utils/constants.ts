export const orderStatus = {
    created: "Creado",
    ordering: "Ordenando",
    deleted: "Borrado", 
    paid: "Pagado", 
    "not-paid": "No pagado",
    inKitchen: "Preparando",
    served: "Servido",
    "user-closed": "Cerrado usuario"
}

export const itemStatus = {
    ordered: "Ordenado", 
    inProgress: "Preparando", 
    done: "Listo"
}

export const userRoles = {
    admin: "Administrador", 
    viewer: "Comandas",
    waiter: "Mesero",
}

export const serverOrderStatus = {
    created: "created",
    ordering: "ordering",
    deleted: "deleted", 
    paid: "paid", 
    "not-paid": "not-paid",
    inKitchen: "inKitchen",
    served: "served",
    "user-closed": "user-closed"
}

// export const foodCategories : Categories = {
//     mainDish: "Plato Fuerte", 
//     sideDish: "Aperitivo", 
//     drinks: "Bebida",
//     dessert: "Postre",
// }

export const foodCategories = ["Plato Fuerte", "Aperitivo","Bebida","Postre"];

export class PersistenceKeys {
    static TOKEN = "fos-token";
    static ROLE = "fos-role";
}