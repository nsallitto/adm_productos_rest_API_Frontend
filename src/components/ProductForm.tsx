import { Product } from "../types"

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({product}: ProductFormProps) {

    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="text-gray-800"
                >Nombre del producto:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre del producto"
                    className="block p-3 w-full bg-gray-100 mt-2"
                    defaultValue={product?.name}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="price"
                    className="text-gray-800"
                >Precio:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Precio Producto. ej. 200, 300"
                    className="block p-3 w-full bg-gray-100 mt-2"
                    defaultValue={product?.price}
                />
            </div>

        </>
    )
}
