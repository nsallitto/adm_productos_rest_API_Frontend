import { Link, Form, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useActionData, redirect } from "react-router-dom";
import { getProductById, updateProduct } from "../service/ProductService";
import { Product } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
    //capturamos el id desde la URL (params)
    if (params.id !== undefined) {
        const product = await getProductById(+params.id)
        if (!product) {
            return redirect('/')
        }
        return product;
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    //Capturamos los datos del Form
    const data = Object.fromEntries(await request.formData())
    let error = ""

    //Validamos los datos del Form
    if (Object.values(data).includes("")) {
        error = 'Todos los campos son Obligatorios'
        return error
    }
    if (params.id !== undefined) {
        //Disparamos la funcion de agregar producto a la DB
        await updateProduct(data, +params.id)
        //Redirigimos a la pag principal
        return redirect('/')
    }

}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export default function EditProduct() {

    const product = useLoaderData() as Product
    const error = useActionData() as string
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
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
                <ProductForm 
                    product={product}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option
                                key={option.name}
                                value={option.value.toString()}
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    value="Guardar Cambios"
                    className="mt-10 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500 transition-all"
                />
            </Form>
        </>
    )
}
