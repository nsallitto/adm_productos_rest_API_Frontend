import { number, object, string, InferOutput, array, boolean } from "valibot";


export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    name: string(),
    price: number(),
    id: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>