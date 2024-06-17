import swoopBottom from "/swoops/swoop-similar-bottom.svg";
import swoopTop from "/swoops/swoop-similar-top.svg";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

/* import { Footer } from "./NotFound"; */
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { ReviewForm } from "../components/ReviewForm";
import { ShoppingCartPopup } from "../components/ShoppingCartPopup";
import SimilarProducts from "../components/SimilarProducts";
import { NEWuseUserStore } from "../store/NEWuseUserStore";
import { useProductsStore } from "../store/useProductsStore";

export const SingleProductPage = () => {
  const { id } = useParams();
  const {
    fetchSingleProduct,
    loadingProduct,
    singleProduct,
    shoppingCart,
    setShoppingCart,
  } = useProductsStore();
  const { user } = NEWuseUserStore();
  const loggedIn = true;
  const [quantity, setQuantity] = useState(1);
  const [allergies, setAllergies] = useState([]);
  console.log(allergies);

  const addToCart = "Add to Cart"; //productLangData.add-to-cart
  const product = singleProduct?.product || {};
  const userAllergy = allergies; //replace with userdata from store
  const [allergyAlert, setAllergyAlert] = useState([]);

  // Adding quantity of items to add to cart
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  // Removing quantity of items to add to cart
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  // Adding product to the cart
  const handleAddToCart = () => {
    setShoppingCart(product, quantity);
    console.log("shopping cart", shoppingCart);
  };

  useEffect(() => {
    if (user) {
      setAllergies(user.user.allergies);
    } else {
      setAllergies([""]);
    }
  }, [user]);

  useEffect(() => {
    console.log("id inside useeffect:", id);
    fetchSingleProduct(id);
  }, [id]);

  //Comparing user allergies with product allergies
  useEffect(() => {
    if (product && product.allergies) {
      const matchingAllergies = product.allergies.filter((allergy) =>
        userAllergy.includes(allergy)
      );
      setAllergyAlert(matchingAllergies);
    }
  }, [product, userAllergy]);

  console.log("Product:", product);
  console.log("param ID:", id);
  console.log("singleproduct", singleProduct);
  return (
    <>
      <ShoppingCartPopup />

      <section className="bg-main-red pt-4 laptop:pt-12 w-full font-heading ">
        <NavLink to="/products">
          <button className="bg-button-varm-light text-text-dark w-8 h-8 rounded-full flex justify-center items-center ml-6 desktop:ml-12 mb-8">
            <IoIosArrowBack />
          </button>
        </NavLink>
        {loadingProduct ? (
          <Loading />
        ) : !product || !product.image || !product.image.url ? (
          <div className="w-6/12 bg-main-red m-auto mt-24 text-text-light text-xl text-center">
            <h2>No product found</h2>
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="w-full tablet:w-11/12 tablet:m-auto tablet:flex pb-12 desktop:w-9/12 relative">
              <img
                src={product.image.url}
                alt={product.description}
                className="w-full tablet:w-7/12 desktop:w-5/12 object-cover aspect-square tablet:rounded-xl"
              />
              {allergyAlert.length > 0 && (
                <div className="absolute top-10 left-0 right-0 flex justify-center w-36  items-center bg-black text-white py-2 px-4 rounded-r-xl">
                  Allergies: {allergyAlert.join(", ")}
                </div>
              )}

              <div className="w-9/12 m-auto tablet:m-0 py-6 text-text-light tablet:pl-8 desktop:pl-16">
                <h2 className="font-light text-lg tablet:text-xl mb-2">
                  {product.brand}
                </h2>
                <h3 className="text-xl tablet:text-3xl mb-8">
                  {product.title}
                </h3>
                <p className="mb-8 leading-loose">{product.description}</p>
                <div className="mb-12 flex">
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                </div>
                <h3 className="text-3xl mb-8">{product.price} €</h3>
                <div className="flex gap-6">
                  <div className="flex">
                    <button
                      onClick={handleDecrement}
                      className="bg-text-light text-text-dark w-5 rounded-l-xl"
                    >
                      -
                    </button>
                    <span className="bg-text-light text-text-dark w-12 flex items-center justify-center text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="bg-text-light text-text-dark w-5 rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-24 h-6 text-xs bg-strong-yellow p-1 rounded-full text-text-dark hover:bg-main-yellow"
                  >
                    {addToCart}
                  </button>
                </div>
              </div>
            </div>
            {/*  Needs more styling, thinking its good to have some info even if its not recommended for you */}
            {!loggedIn && product.skin.length > 0 && (
              <div className="w-11/12 m-auto tablet:flex pb-12 desktop:w-9/12 relative">
                <h4>Recommended for: </h4>
                <ul className="list-none flex flex-col tablet:flex-row flex-wrap justify-evenly gap-4">
                  {product.skin.map((item, index) => (
                    <li
                      key={index}
                      className="ml-4 bg-button-varm-light w-36 p-2 rounded-xl"
                    >
                      {" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
      <section>
        <SimilarProducts
          subcategory={product.subcategory}
          currentProductId={product._id}
        />
      </section>
      <ReviewForm />

      {/* add the X of the bg-main-X to the aboveColor to make the Footer match*/}
      <Footer aboveColor={"red"} />
    </>
  );
};
