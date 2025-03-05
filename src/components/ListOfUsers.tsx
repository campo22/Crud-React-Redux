import {
    Badge,
    Card,
    Table,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Title
} from '@tremor/react';
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '../components/Ico'; // Asegúrate de que la ruta es correcta
import { useAppSelector } from '../hooks/store';
import { userAccions } from '../hooks/userAccions';
import { CreateNewUser } from './CreateNewUser';


export default function ListOfUsers() {

    const users = useAppSelector((state) => state.users);
    const { DeleteUser } = userAccions();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Card className='w-full max-w-4xl p-6 mx-auto mt-16 bg-white rounded-lg shadow-lg'>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Title>
                            Usuarios
                            <Badge className='mb-3 ml-1 text-sm rounded-full bg-lime-200'>
                                {users.length}
                            </Badge>
                        </Title>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 font-bold text-white rounded-full bg-lime-300 hover:bg-lime-900"
                    >
                        Agregar Usuario
                    </button>
                </div>

                <Table>
                    <TableHead>
                        <TableRow className="bg-lime-100">
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Nombre</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Acciones</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    {users.map((item) => (
                        <TableRow className="border-b" key={item.name}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className='flex items-center gap-1'>
                                <img
                                    src={`https://unavatar.io/github/${item.github}`}
                                    alt={item.name}
                                    className="w-16 h-16 mr-2 rounded-full"
                                />
                                {item.name}
                            </TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell className="flex gap-2">
                                <button type="button">

                                    <EditIcon className="text-blue-500 size-6 hover:text-blue-700" />
                                </button>

                                <button onClick={() => DeleteUser(item.id)} type='button'>

                                    <DeleteIcon className="text-red-500 size-6 hover:text-red-900 " />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

            </Card>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-zinc-600">
                    <div className="p-4 bg-white rounded-lg">
                        <CreateNewUser />
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
