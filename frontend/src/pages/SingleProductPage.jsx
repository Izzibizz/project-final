import { useProductsStore } from "../store/useProductsStore";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { MdOutlineStar } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { ImCross } from "react-icons/im";
import SimilarProducts from "../components/SimilarProducts";
/* import { NotFound } from "./NotFound"; */
import { Footer } from "../components/Footer";
import { ReviewForm } from "../components/ReviewForm";
import { ShoppingCartPopup } from "../components/ShoppingCartPopup";
import { StickyButton } from "../components/StickyButton";
import swoopTop from "/swoops/swoop-similar-top.svg";
import swoopBottom from "/swoops/swoop-similar-bottom.svg";

export const SingleProductPage = () => {
  const { id } = useParams();
  const {
    fetchSingleProduct,
    loadingProduct,
    singleProduct,
    shoppingCart,
    setShoppingCart,
  } = useProductsStore();
  const { user, loggedIn } = useUserStore();
  // const loggedIn = true;
  const [quantity, setQuantity] = useState(1);
  const [userAllergies, setUserAllergies] = useState([]);

  const addToCart = "Add to Cart"; //productLangData.add-to-cart
  const product = singleProduct?.product || {};
  const profile = user?.user || {};

  const [allergyAlert, setAllergyAlert] = useState([]);
  const [recommendedTag, setRecommendedTag] = useState(false);

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
  };

  useEffect(() => {
    if (profile?.allergies) {
      setUserAllergies(profile.allergies);
    } else {
      setUserAllergies([]);
    }
  }, []);

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  //Comparing user allergies with product allergies
  useEffect(() => {
    if (product?.allergies && userAllergies?.length > 0) {
      const matchingAllergies = product.allergies.filter((allergy) =>
        userAllergies.includes(allergy)
      );
      setAllergyAlert(matchingAllergies);
    }
  }, [product, userAllergies]);

  //comparing user type with product recommendations
  useEffect(() => {
    if (profile && product) {
      const matchesSkin = profile.skin?.some((skinType) =>
        product.skin?.includes(skinType)
      );
      const matchesHairMoist = product.hair?.moisture?.some((moisture) =>
        profile.hair?.moisture?.includes(moisture)
      );
      const matchesHairShape = product.hair?.shape?.some((shape) =>
        profile.hair?.shape?.includes(shape)
      );
      const isNotAllergic = !profile.allergies?.some((allergy) =>
        product.allergies?.includes(allergy)
      );
      if 
        (isNotAllergic && (matchesSkin ||
        matchesHairMoist ||
        matchesHairShape))
       {
        setRecommendedTag(true);
      } else {
        setRecommendedTag(false);
      }
      console.log(isNotAllergic)
    }
  }, [product, profile]);

  return (
    <>
      <ShoppingCartPopup />
      {!loggedIn && <StickyButton />}
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
                <div className="absolute top-10 left-0 right-0 flex justify-center w-36  items-center bg-strong-red2 text-white py-2 px-4 rounded-r-xl">
                  Allergies: {allergyAlert.join(", ")}
                </div>
              )}
              {recommendedTag && (
                <div className="absolute top-10 left-0 right-0 flex justify-center w-36  items-center bg-main-green text-white py-2 px-4 rounded-r-xl">
                  Recommended for you
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
                <div className="flex flex-col desktop:flex-row">
                  <div>
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
                    {product.pros?.length > 0 && (
                      <div className="flex my-8 gap-2">
                        {product.pros.includes("crueltyfree") && (
                          // Content for cruelty-free products
                          <img
                            src="/crueltyfree.svg"
                            alt="cruelty free"
                            title="Cruelty free"
                            className="w-14 h-14"
                          />
                        )}
                        {product.pros.includes("organic") && (
                          // Content for organic products
                          <img
                            src="/organic.svg"
                            alt="organic"
                            title="Organic"
                            className="w-14 h-14"
                          />
                        )}
                        {product.pros.includes("vegan") && (
                          // Content for organic products
                          <img
                            src="/vegan.svg"
                            alt="vegan"
                            title="Vegan"
                            className="w-14 h-14"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="tablet:hidden flex laptop:flex text-text-dark flex-col laptop:ml-0 desktop:ml-36 mt-14 gap-10 text-xs">
  {(!loggedIn || (loggedIn && !recommendedTag)) && (
    <div className="w-full relative flex flex-col gap-8">
      {allergyAlert?.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <ImCross className="w-4 h-4" />
          <h3 className="font-black text-sm laptop:text-base">
            Not recommended for you
          </h3>
        </div>
      )}
      {product.skin && product.skin?.length > 0 && (
        <div className="w-full relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-sm">
            Recommended for skintypes:
          </h4>
          <ul className="list-none flex flex-wrap gap-4">
            {product.skin.map((item, index) => (
              <li
                key={index}
                className="bg-button-varm-light w-24 text-center p-2 rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.hair?.moisture?.length > 0 && (
        <div className="w-full relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-sm">
            Recommended for hair moisture level:
          </h4>
          <ul className="list-none flex flex-wrap gap-4">
            {product.hair.moisture.map((item, index) => (
              <li
                key={index}
                className="bg-button-varm-light w-24 text-center p-2 rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.hair?.shape?.length > 0 && (
        <div className="w-full relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-sm">
            Recommended for hairshape:
          </h4>
          <ul className="list-none flex flex-wrap gap-4">
            {product.hair.shape.map((item, index) => (
              <li
                key={index}
                className="bg-button-varm-light w-24 p-2 text-center rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {product.allergies?.length > 0 && (
        <div className="w-full relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-sm">
            Allergens:
          </h4>
          <ul className="list-none flex flex-wrap gap-4">
            {product.allergies.map((item, index) => (
              <li
                key={index}
                className="bg-strong-red2 text-text-light w-28 p-2 text-center rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )}
</div>
                </div>
              </div>
            </div>
{/* Different position of the same content for tablet */}
<div className="flex-col w-11/12 mx-auto hidden tablet:flex laptop:hidden ">
  {(!loggedIn || (loggedIn && !recommendedTag)) && (
    <>
    {loggedIn && !recommendedTag && (
      <div className="relative flex flex-col gap-2">
         {allergyAlert.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <ImCross className="w-4 h-4" />
          <h3 className="font-black text-base">
            Not recommended for you
          </h3>
        </div>
         )}
      </div>
    )}
    <div className="hidden tablet:flex flex-col flex-wrap w-full mb-12 gap-10 laptop:hidden text-sm">
      {product.skin?.length > 0 && (
        <div className="relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-base">
            Recommended for skintype:
          </h4>
          <ul className="list-none flex flex-wrap gap-4 text-center">
            {product.skin.map((item, index) => (
              <li
                key={index}
                className="bg-button-varm-light w-32 p-2 rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.hair?.moisture?.length > 0 && (
        <div className="relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-base">
            Recommended for hairtype:
          </h4>
          <ul className="list-none flex flex-wrap gap-4 text-center">
            {product.hair.moisture.map((item, index) => (
              <li
                key={index}
                className="bg-button-varm-light w-32 p-2 rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}


      {product.hair?.shape?.length > 0 && (
        <div className="relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-base">
            Recommended for hairshape:
          </h4>
          <ul className="list-none flex flex-wrap gap-4 text-center">
            {product.hair.shape.map((item, index) => (
              <li
                key={index}
                className="bg-button-varm-light w-32 p-2 rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}


      {product.allergies?.length > 0 && (
        <div className="relative flex flex-col gap-2">
          <h4 className="text-text-light font-bold text-base">
            Allergens:
          </h4>
          <ul className="list-none flex flex-wrap gap-4 text-center">
            {product.allergies.map((item, index) => (
              <li
                key={index}
                className="bg-strong-red2 text-text-light w-32 p-2 justify-self-center rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
)}
</div>
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
