import { useNavigate, Form, redirect, ActionFunctionArgs, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../service/ProductService"

type ProductDetailsProp = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        // redireccionamos porque no hay pagina de eliminar (solo queriamos el id del params)
        return redirect('/')
    }
}

export default function ProductDetails({ product }: ProductDetailsProp) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg text-xs p-2 border border-black-100 uppercase font-bold w-full`}
                    >
                        {isAvailable ? "Disponible" : "No disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-1">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-400 w-full p-2 rounded-lg text-white text-xs text-center transition-all"
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                    >
                        Editar
                    </button>
                    {/* Usamos Form para poder mandar un action */}
                    <Form
                        method="POST"
                        //utilizamos este action para que direccione y obtener el id
                        action={`productos/${product.id}/eliminar`}
                        //onSubmit se ejecuta antes que el action.
                        onSubmit={(e) => {
                            if (!confirm("¿Seguro que deseas eliminar este producto?")) {
                                e.preventDefault()
                            }
                        }}
                        className="w-full"
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 hover:bg-red-400 w-full p-2 rounded-lg text-white text-xs text-center cursor-pointer transition-all"
                        />
                    </Form>
                </div>
            </td>

        </tr>
    )
}
