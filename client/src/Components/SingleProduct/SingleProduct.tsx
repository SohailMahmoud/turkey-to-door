import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function SingleProduct() {
    const {productId} = useParams<{productId: string}>();
    const [product, setProduct] = useState<string>();

    useEffect(() => {
        setProduct(productId)
    }, [productId])

    return (
        <h1 className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center">{`Single Product id: ${product}`}</h1>
    )    
}