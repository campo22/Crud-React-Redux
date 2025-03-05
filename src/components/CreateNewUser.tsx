import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { userAccions } from "../hooks/userAccions";


export const CreateNewUser = () => {
    const { addUser } = userAccions();
    const [resul, setResul] = useState<'Ok' | 'Error' | null>(null);// 'Ok' | 'Error' | null

    const handleSubmit = (even: React.FormEvent<HTMLFormElement>) => {
        even.preventDefault();
        setResul(null);

        const form = even.target as HTMLFormElement;
        const formData = new FormData(form)

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            return setResul('Error');
        }

        addUser({ name, email, github });
        setResul('Ok');
        form.reset();

    }
    return (
        <Card className="w-full p-6 mx-auto mt-16 max-w-96">
            <Title>Create New User</Title>

            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre"
                    className="mt-4"
                />
                <TextInput
                    type="text"
                    name="email"
                    placeholder="Ingresa tu correo"
                    className="mt-4"
                />
                <TextInput
                    type="text"
                    name="github"  // Este nombre debe coincidir con el que buscamos en formData
                    placeholder="Ingresa usuario de github"
                    className="mt-4"
                />

                <div>
                    <Button
                        type="submit"
                        className="mt-5 bg-blue-500 hover:bg-blue-700 text-whit">
                        Crear Usuario
                    </Button >
                    <span>
                        {resul === 'Ok' && <Badge className=" bg-cyan-500">Usuario creado con exito</Badge>}
                        {resul === 'Error' && <Badge className="bg-red-500 ">Error al crear usuario</Badge>}

                    </span>
                </div>

            </form>

        </Card>
    )
}


