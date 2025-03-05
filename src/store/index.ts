import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { UserWithId, rollbackUser } from "./users/slice";

// creamos el middleware para guardar en el localstorage
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => async (action) => {
		// Verificar que 'action' es un objeto válido
		if (typeof action !== "object" || action === null) {
			return next(action);
		}

		// Extraer type y payload con tipo seguro
		const { type, payload } = action as { type: string; payload: string };

		let userToRemove: UserWithId | undefined;

		if (type === "user/deleteUserById") {
			const currentState = store.getState();
			userToRemove = currentState.users.find(
				(user: UserWithId) => user.id === payload,
			);
		}

		const result = next(action);

		if (type === "user/deleteUserById") {
			try {
				const res = await fetch(
					`https://jsonplaceholder.typicode.com/users/${payload}`,
					{ method: "DELETE" },
				);

				if (!res.ok) {
					throw new Error("Error al eliminar usuario");
				}

				toast.success(`Usuario ${payload} eliminado correctamente`);
			} catch (error) {
				toast.error(`Error al eliminar el usuario ${payload}`);
				if (userToRemove) {
					store.dispatch(rollbackUser(userToRemove));
				}
			}
		}

		return result;
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(persistanceLocalStorageMiddleware)
			.concat(syncWithDatabaseMiddleware),
});

// obtenemos el tipado de la store
export type RootState = ReturnType<typeof store.getState>;

// obtenemos el tipado de la dispatch y el dispatch
export type AppDispatch = typeof store.dispatch;
