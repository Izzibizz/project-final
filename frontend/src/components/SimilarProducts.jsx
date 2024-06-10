import { ProductCard } from "./ProductCard";
import { useProductsStore } from "../store/useProductsStore";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

const SimilarProducts = ({ subcategory, currentProductId }) => {
  const { productsData } = useProductsStore();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [numProductsToShow, setNumProductsToShow] = useState(6);

  const updateNumProductsToShow = () => {
    if (window.innerWidth >= 1024) {
      setNumProductsToShow(6);
    } else {
      setNumProductsToShow(4);
    }
  };

  useEffect(() => {
    console.log(currentProductId);
    if (productsData.products) {
      const filteredProducts = productsData.products.filter(
        (product) =>
          product.subcategory === subcategory && product._id !== currentProductId
      );
      setSimilarProducts(filteredProducts);
    }
  }, [subcategory, currentProductId, productsData.products]);

  useEffect(() => {
    updateNumProductsToShow();
    window.addEventListener("resize", updateNumProductsToShow);
    return () => {
      window.removeEventListener("resize", updateNumProductsToShow);
    };
  }, []);

  return (
    <>
      {similarProducts.length > 0 && (
        <div className="bg-main-white py-8 flex flex-col items-center">
          <h3 className="py-8 text-center font-heading text-text-dark text-xl ">
            Similar products
          </h3>
          <ul className="w-9/12 m-auto grid grid-cols-2 gap-6 tablet:grid-cols-4 tablet:w-9/12 laptop:grid-cols-5 desktop:grid-cols-6">
            {similarProducts.slice(0, numProductsToShow).map((item, index) => (
                <li key={index} className="w-full">
                  <ProductCard data={item} />
                </li>
              ))}
          </ul>
          <NavLink to="/products" >
          <button className="w-24 h-6 my-12 text-xs bg-main-yellow p-1 rounded-full text-text-dark  hover:bg-button-light ">
               All products
              </button>
        </NavLink>
        </div>
      )}
    </>
  );
};

export default SimilarProducts;