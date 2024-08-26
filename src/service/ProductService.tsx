import { safeParse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { isBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}
export async function addProduct(data: ProductData) {
    try {
        //enviamos datos a valibot y guardamos resultados
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.log(error);

    }

}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            const sortedResult = result.output.sort((a, b) => a.price - b.price)
            return sortedResult
        } else {
            throw new Error("Hubo un error...");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error...");
        }
    } catch (error) {
        console.log(error);

    }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
    try {
        //enviamos datos a valibot y guardamos resultados
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: isBoolean(data.availability.toString())
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error);

    }

}

export async function deleteProduct(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);

    }

}

export async function updateAvailability(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);

    }
}