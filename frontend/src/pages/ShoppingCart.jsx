import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import { NEWuseUserStore } from "../store/NEWuseUserStore";
import { useProductsStore } from "../store/useProductsStore";

export const ShoppingCart = () => {
  const {
    shoppingCart,
    updateCart,
    removeAllByIdFromCart,
    removeAllFromCart,
    totalPrice,
  } = useProductsStore();
  const { user, loggedIn } = NEWuseUserStore();
  const [newQuantity, setNewQuantity] = useState(0);
  const recommended = false;
  const [checkout, setCheckout] = useState(false);

  console.log("User: ", user.user);
  const profile = user.user;

  /* dotenv.config(); */
  const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(apiKey);

  const handleIncrement = (prevQuantity, id) => {
    setNewQuantity((currentQuantity) => {
      const newQty = prevQuantity + 1; // Increment the previous quantity by 1
      updateCart(newQty, id); // Update the cart with the new quantity
      return newQty; // Return the updated quantity
    });
  };

  const handleDecrement = (prevQuantity, id) => {
    setNewQuantity((currentQuantity) => {
      const newQty = prevQuantity > 0 ? prevQuantity - 1 : 0; // Decrement the previous quantity by 1
      if (newQty > 0) {
        updateCart(newQty, id); // Update the cart with the new quantity
      } else {
        removeAllByIdFromCart(id); // Remove the item from the cart if quantity becomes 0
      }
      return newQty; // Return the updated quantity
    });
  };

  const calculateTotalCost = (item) => {
    const totalCost = item.quantity * item.product.price;
    const roundedPrice = Math.ceil(totalCost * 100) / 100; // Round up to 2 decimal places
    return `${roundedPrice}`;
  };

  const openCheckout = () => {
    setCheckout(!checkout);
  };

  console.log("shopping cart :", shoppingCart);
  console.log("total price", totalPrice);

  return (
    <section className="bg-main-red h-full min-h-screen pt-4 pb-20 laptop:pt-12 w-full ">
      <NavLink to="/products">
        <button className="bg-button-varm-light text-text-dark text-xs p-2 px-3 laptop:text-sm rounded-full flex justify-center items-center ml-6 desktop:ml-12 mb-8 gap-2">
          <IoIosArrowBack /> Continue shopping
        </button>
      </NavLink>
      {checkout ? (
        <div className="flex flex-col ">
          <div className="bg-main-white max-w-fit mx-auto max-h-80 rounded-xl p-6 desktop:p-10  gap-4 font-heading text-xs desktop:text-sm flex flex-col">
            {loggedIn && checkout ? (
              <div>
                <h2 className="text-2xl mb-4">Shipping to:</h2>
                <p className="text-lg">
                  {profile.firstname} {profile.lastname}
                </p>
                <p className="mt-2">{profile.address.street}</p>
                <p>
                  {" "}
                  <span>{profile.address.postalCode}</span>
                  <span> {profile.address.city}</span>
                </p>
                <p>{profile.address.country}</p>
              </div>
            ) : null}

            <h3 className="text-lg desktop:text-2xl font-bold">
              Total price:{" "}
              <span className="bg-main-yellow rounded-xl p-2 tracking-widest">
                {totalPrice} €
              </span>
            </h3>
          </div>
          <div>
            <button
              onClick={openCheckout}
              className="bg-cta-blue text-text-light text-sm p-5 px-10 mt-4 laptop:text-sm rounded-full flex justify-center items-center mb-8 m-auto tablet:mb-8 tablet:ml-auto gap-2"
            >
              {checkout ? "Change cart" : "Checkout!"}
            </button>
          </div>
        </div>
      ) : null}

      {checkout ? (
        <div className="font-body text-text-light">
          <h1 className="text-2xl laptop:text-4xl laptop:mb-4 text-center">
            The final hurdle!
          </h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} />
          </Elements>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-11/12 desktop:w-6/12 m-auto text-center font-heading text-text-light">
            <h2 className="text-2xl laptop:text-4xl laptop:mb-4">
              Shopping cart
            </h2>
            <h3>
              {shoppingCart.length > 0
                ? `${shoppingCart.length} product${
                    shoppingCart.length > 1 ? "s" : ""
                  }`
                : "Your cart is empty"}
            </h3>
            {shoppingCart.length > 0 && (
              <button
                onClick={removeAllFromCart}
                className="bg-button-varm-light text-text-dark text-xs p-2 px-3 laptop:text-sm rounded-full flex justify-center items-center mb-8 m-auto tablet:m-0 tablet:mb-8 tablet:ml-auto gap-2"
              >
                <ImCross /> Empty cart
              </button>
            )}
          </div>
          <div className="flex flex-col w-11/12 tablet:flex-row desktop:w-6/12 gap-8 desktop:gap-20 m-auto laptop:px-18">
            <ul className=" w-full flex flex-col gap-4 tablet:gap-8">
              {shoppingCart &&
                shoppingCart.map((item, index) => (
                  <li
                    key={index}
                    className=" flex font-heading justify-center tablet:justify-left gap-4 m-auto tablet:gap-6 text-text-light"
                  >
                    <img
                      src={item.product.image.url}
                      alt={item.product.title}
                      className="rounded-xl w-4/12 tablet:aspect-square tablet:w-2/12  object-cover"
                    />
                    <div className=" w-6/12 tablet:w-full flex-col tablet:flex-row justify-between flex">
                      <div className="flex flex-col gap-2 text-xs tablet:text-sm desktop:text-base ">
                        <NavLink to={`/products/${item.product._id}`}>
                          <h4 className="font-black">{item.product.title}</h4>
                          <h4>{item.product.brand}</h4>
                          <p>{item.product.size}</p>
                          <h3 className="mt-4 desktop:text-xl">
                            {item.product.price} €
                          </h3>
                        </NavLink>
                        {recommended && (
                          <div className="bg-cta-blue w-fit p-2 rounded-lg">
                            Recommended for you
                          </div>
                        )}
                      </div>

                      <div className="max-w-max">
                        <div className="flex gap-6 tablet:justify-end">
                          <div className="flex h-6">
                            <button
                              onClick={() =>
                                handleDecrement(item.quantity, item.product._id)
                              }
                              className="bg-text-light text-text-dark w-5 rounded-l-xl"
                            >
                              -
                            </button>
                            <span className="bg-text-light text-text-dark w-6 tablet:w-8 desktop:w-12 flex items-center justify-center text-xs tablet:text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(item.quantity, item.product._id)
                              }
                              className="bg-text-light text-text-dark w-5 rounded-r-xl"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeAllByIdFromCart(item.product._id)
                            }
                            className="transparent"
                          >
                            {" "}
                            <FaTrashCan />
                          </button>
                        </div>
                        <p className="font-header text-text-light text-sm mt-4 tablet:mt-8 laptop:mt-14 ">
                          subtotal:{" "}
                          <span className="bg-main-yellow rounded-xl p-1 px-2 tablet:p-2 tracking-widest font-bold text-text-dark">
                            {calculateTotalCost(item)} €{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            {totalPrice > 0 && (
              <div className="flex flex-col justify-start">
                <div className="bg-main-white max-w-fit mx-auto max-h-80 rounded-xl p-6 desktop:p-10  gap-4 font-heading text-xs desktop:text-sm flex flex-col">
                  {user && checkout ? (
                    <div>
                      <span>{profile.firstname}</span>
                      <span> {profile.lastname}</span>
                      <p className="mt-2">{profile.address.street}</p>
                      <p>
                        {" "}
                        <span>{profile.address.postalCode}</span>
                        <span> {profile.address.city}</span>
                      </p>
                      <p>{profile.address.country}</p>
                    </div>
                  ) : null}

                  <h3 className="text-lg desktop:text-2xl font-bold">
                    Total price:{" "}
                    <span className="bg-main-yellow rounded-xl p-2 tracking-widest">
                      {totalPrice} €
                    </span>
                  </h3>
                </div>
                <div>
                  <button
                    onClick={openCheckout}
                    className="bg-cta-blue text-text-light text-sm p-5 px-10 mt-4 laptop:text-sm rounded-full flex justify-center items-center mb-8 m-auto tablet:mb-8 tablet:ml-auto gap-2"
                  >
                    {checkout ? <ImCross /> : "Checkout!"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};
