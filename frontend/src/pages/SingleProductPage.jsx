import { useProductsStore } from "../store/useProductsStore"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Loading } from "../components/Loading";
import { MdOutlineStar } from "react-icons/md";

export const SingleProductPage = () => {
  const { id } = useParams();
  const { fetchSingleProduct, loadingProduct, singleProduct } = useProductsStore();

  const addToCart = "Add to Cart"; //productLangData.add-to-cart

  useEffect(() => {
    fetchSingleProduct(id)
  }, [])

  return (
    <section className="bg-main-red h-full min-h-screen w-full pt-12 laptop:pt-28">
  {loadingProduct ? (
    <Loading />
  ) : !singleProduct || !singleProduct.image || !singleProduct.image.url ? (
    <div className="w-6/12 bg-main-red m-auto mt-24 font-heading text-text-light text-xl text-center"><h2>No product found</h2><Loading /></div>
  ) : (
    <div className="w-full tablet:w-11/12 tablet:mt-4 tablet:m-auto tablet:flex">
      <img src={singleProduct.image.url} alt={singleProduct.description} className="w-full tablet:w-7/12 desktop:w-4/12 object-cover aspect-square tablet:rounded-xl "/>
      <div className="w-9/12 m-auto tablet:m-0 py-6 text-text-light font-heading tablet:pl-6">
        <h2 className="font-light text-lg tablet:text-xl mb-2">{singleProduct.brand}</h2>
        <h3  className="text-xl tablet:text-3xl mb-8">{singleProduct.title}</h3>
        <p className="mb-8 leading-loose">{singleProduct.description}</p>
        <div className="mb-12 flex">
        <MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar />
        </div>
        <h3 className="text-3xl mb-8">{singleProduct.price} €</h3>
        <div className="flex">
        <button classname="bg-main-yellow rounded-l-xl w">-</button><button classname="bg-text-light rounded-r-xl w">+</button>
        </div>
        <button className="w-24 text-xs bg-button-light p-1 rounded-full text-text-dark hover:bg-main-yellow">
          {addToCart}
        </button>
      </div>
    </div>
  )}
    </section>
  )
};
