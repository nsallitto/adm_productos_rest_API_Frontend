import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../service/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
    //Capturamos los datos del Form
    const data = Object.fromEntries(await request.formData())
    let error = ""

    //Validamos los datos del Form
    if (Object.values(data).includes("")) {
        error = 'Todos los campos son Obligatorios'
        return error
    }

    //Disparamos la funcion de agregar producto a la DB
    await addProduct(data)

    //Redirigimos a la pag principal
    return redirect('/')
}

export default function NewProduct() {
    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
                <Link
                    to={"/"}
                    className="rounded-md bg-indigo-600 hover:bg-indigo-400 text-center text-white text-sm font-bold shadow-sm px-4 py-3 transition-all"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method="POST"
            >
                <ProductForm />

                <input
                    type="submit"
                    value="Registrar Producto"
                    className="mt-10 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500 transition-all"
                />
            </Form>
        </>
    )
}
