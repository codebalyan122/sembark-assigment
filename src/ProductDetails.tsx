import { useParams } from "react-router"
import Navbar from "./components/Navbar"
import { useProducts } from "./contextapi";

import ButtonComp from "./components/Button";

const ProductDetails = () => {
    const {id} = useParams()
    console.log(id)
    const { getProductById } = useProducts();
    const product = getProductById(Number(id));
const {addToCart} = useProducts();
    const cartHandler = ()=>{
      
        if(product){ 
            addToCart(product);
        }else{
            console.error("Product not found");
        }
    }
    
  return (
<>
    <Navbar/>
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">

        <div className="w-full md:w-auto mb-6 md:mb-0">
            <img 
                src={product?.image} 
                alt={product?.title} 
                className="w-full md:w-96 h-64 md:h-96 object-cover rounded-lg mx-auto" 
            />
        </div>
        
        <div className="flex flex-col ml-0 md:ml-20 items-start justify-center p-6 rounded-lg w-full md:h-64 max-w-md">
            <p className="bg-blue-200 rounded-lg p-2 text-md mb-6 md:mb-10">{product?.category}</p>

            <div className="rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">{product?.title}</h1>
                <p className="mb-4">{product?.description}</p>
                <label className="text-lg font-semibold mb-2 text-gray-500">
                    Rating: {product?.rating.rate} ({product?.rating.count} reviews)
                </label>
                <h1 className="text-lg font-bold mb-4 text-gray-500">Price: ${product?.price}</h1>
                <ButtonComp  onClick={cartHandler} title={"Add to cart"} />
            </div>
        </div>

    </div>
</>
  )
}

export default ProductDetails