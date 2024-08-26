import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {loader as productLoaders, action as updateAvailabilityAction} from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, { loader as editProductLoader, action as editProductAction} from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productLoaders,
                action: updateAvailabilityAction
            },
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: "productos/:id/editar",
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: "productos/:id/eliminar",
                action: deleteProductAction
            }
        ]
    }
])