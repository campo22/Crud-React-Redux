import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type userId= string;

const DEFAULT_STATE=[
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            github: 'aejimenez19',
        },
        {
            id: '2',
            name: 'Diver campo',
            email: 'diver.campo@example.com',
            github: 'Campo22',
        },
        {
            id: '3',
            name: 'Jol',
            email: 'john.doe@example.com',
            github: 'midudev',
        }
    ];

export interface User{
    name: string,
    email: string,
    github: string,
}
export interface UserWithId extends User{
    id: userId;
}

// Definimos el estado inicial de Redux para los usuarios
const initialState: UserWithId[] = (() => {  // Función autoinvocada (IIFE) que devuelve un array de usuarios
    
    // Intentamos obtener el estado guardado en localStorage
    const persistedState = localStorage.getItem('__redux__state__');

    // Si existe un estado guardado en localStorage...
    if (persistedState) {
        // Lo convertimos de JSON a un objeto JavaScript y retornamos solo la parte de los usuarios
        return JSON.parse(persistedState).users;
    }

    // Si no hay datos guardados, devolvemos un estado por defecto
    return DEFAULT_STATE;

})(); // ← La función se ejecuta inmediatamente y asigna el resultado a initialState




export const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers:{
        addNewUser: ( state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
           return  [ ...state, {id, ...action.payload}];


        },
        deleteUserById: (state, action: PayloadAction<userId>) => {
            const id= action.payload;
            return state.filter(user=> user.id !== id);
        }
    }
 })

//exportando el reducer para usarlo en el store
 export default userSlice.reducer; 

//exportando la accion para usarla en el store  ejemplo 
 export const { addNewUser, deleteUserById} = userSlice.actions;  // ← Acciones para interactuar




        