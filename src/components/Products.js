import "./Products.css";
import {useEffect, useState} from "react";
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Products() {
    const [products, setProducts] = useState([]);
    const productNames = ["home-bar-display-cabinet-21-61005.json", "home-bar-2-door-with-drawer-cabinet-21-61004.json", "home-bar-3-drawer-cabinet-21-61003.json", "home-bar-wall-wine-rack-cabinet-21-61000.json", "home-bar-double-display-cabinet-42-61022.json", "home-bar-wine-storage-cabinet-21-61023.json"]
    const productLinkSuffix = "https://shopnewage.com/collections/home-bar/products/";
    const getProducts = async()=>{
        const urlsToFetch = productNames.map(product=>axios.get(productLinkSuffix + product))
        const responseProducts = await Promise.all(urlsToFetch);
        setProducts(responseProducts.map(res=>res.data.product));
    }
    useEffect(()=>{
        getProducts();
    }, [])
    return <>
<div class="flex-container">
  {products.map(product=><div>
    <LazyLoadImage
      alt={"Loading"}
      src={"https://cdn.shopify.com/s/files/1/1428/2706/products/61005_301_Primary01_be87b4b0-bb64-4ecd-b20b-f614e758d279_1024x.jpg?v=1558015087"}
       />
      <div>{product.title}</div>
      <div><del>${product.variants && product.variants[0].compare_at_price}</del></div>
      <div class="price-text">${product.variants && product.variants[0].price}</div>
      <button class="buy-now-button">Buy Now</button>
      </div>)}
      </div>
    </>
}

export default Products;