import { addNewUser, deleteUserById, User, userId } from "../store/users/slice";
import { useAppDispatch } from "./store";


export const userAccions = () => {
    const dispatch = useAppDispatch();

    const addUser = ({ name, email, github }: User) => {
        dispatch(addNewUser({ name, email, github }));
    }

    const DeleteUser = (id: userId) => {
        dispatch(deleteUserById(id))
    }

    return { DeleteUser, addUser }

}