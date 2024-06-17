import burgerMenu from "/bars-solid.svg";
import shoppingCart from "/cart-shopping-solid.svg";
import glimLogo from "/glimSmall.svg";
import swoop from "/nav-swoop2.svg";
import userIcon from "/user-solid.svg";
import xMark from "/xmark-solid.svg";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import animation from "../assets/Circle-loading-Animation.json";
import { NEWuseUserStore } from "../store/NEWuseUserStore";
import { WelcomeMessage } from "./WelcomeMessage";

//If signed in Sign in should display username/firstname

export const Navigation = ({ data }) => {
  const {
    email,
    password,
    userId,
    loginUser,
    loggedIn,
    showWelcomePopup,
    setShowWelcomePopup,
    setAutomaticLogOut,
    loadingUser,
    logoutUser,
  } = NEWuseUserStore();
  const [open, setOpen] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navRef = useRef();
  const btnRef = useRef();
  const overlayRef = useRef();
  const modalContentRef = useRef();
  const burgerRef = useRef();
  const logoutTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(emailInput, passwordInput);
    console.log("loginUser:", loginUser);
  };

  const handleClickOutside = (event) => {
    if (overlayRef.current && !modalContentRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleClickOutsideBurger = (event) => {
    if (
      !navRef.current.contains(event.target) ||
      burgerRef.current.contains(event.target)
    ) {
      setOpenBurger(false);
    }
  };

  useEffect(() => {
    if (openBurger) {
      document.addEventListener("mousedown", handleClickOutsideBurger);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBurger);
    };
  }, [openBurger]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (showWelcomePopup) {
      setOpen(false);
      navigate("/");
      setTimeout(() => {
        setShowWelcomePopup(false);
      }, 1500);
      // Set a timeout to log out the user after 15 minutes
      logoutTimeoutRef.current = setTimeout(() => {
        logoutUser();
        setAutomaticLogOut(true);
        navigate("/");
      }, 1800000); //  900000 15 minutes
    } else {
      // Clear the timeout if the user logs out
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
    }
  }, [loggedIn]);
  // add a message for user to know theyve been logged out (welcome message comp could maybe be reused? but it should have the click outside func that the login box has.. would be nice)

  const toggleLogin = () => {
    setOpen(!open);
  };

  const toggleBurger = () => {
    setOpenBurger(!openBurger);
  };

  return (
    <>
      {showWelcomePopup && <WelcomeMessage />}
      <nav className="sticky top-0 w-full z-20">
        <div className="grid grid-cols-3 bg-strong-red border-b-2 border-main-red border-opacity-35 backdrop-blur-xl justify-between">
          <div className="left-nav flex">
            <NavLink
              to="/products"
              className="text-white m-4 hidden laptop:block"
            >
              <p className="font-body text-white font-extralight text-lg hidden tablet:block">
                {data.products}
              </p>
            </NavLink>
            <NavLink to="/about" className="text-white m-4 hidden laptop:block">
              <p className="font-body text-white font-extralight text-lg hidden tablet:block">
                {data.about}
              </p>
            </NavLink>
            {loggedIn ? (
              <NavLink to={`/profile/${userId}`} className="laptop:hidden">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="h-6 m-3 tablet:h-7 tablet:m-3"
                />
              </NavLink>
            ) : (
              <div
                onClick={toggleLogin}
                className="text-white cursor-pointer laptop:hidden"
              >
                <img
                  src={userIcon}
                  alt="Profile"
                  className="h-6 m-3 tablet:h-7 tablet:m-3"
                />
              </div>
            )}
            <NavLink to="/cart" className="text-white tablet:hidden">
              <img
                src={shoppingCart}
                alt="Shopping cart"
                className="h-6 my-3 tablet:h-7 tablet:m-3"
              />
            </NavLink>
          </div>
          <div className="center-nav flex m-auto">
            <NavLink to="/" className="text-white">
              <img className="w-40 my-4" src={glimLogo} alt="glim logo" />
            </NavLink>
          </div>
          <div className="right-nav flex flex-row justify-end">
            {loggedIn ? (
              <NavLink to={`/profile/${userId}`}>
                <img
                  src={userIcon}
                  alt="Profile"
                  className="hidden laptop:flex laptop:h-7 laptop:mt-4"
                />{" "}
              </NavLink>
            ) : (
              <div
                onClick={toggleLogin}
                className="text-white my-4 cursor-pointer"
              >
                <p className="font-body text-white font-extralight text-lg hidden laptop:block">
                  {data.login}
                </p>
              </div>
            )}
            <NavLink to="/cart" className="text-white">
              <img
                src={shoppingCart}
                alt="Shopping cart"
                className="h-7 m-2 hidden tablet:block laptop:h-8 laptop:m-4"
              />
            </NavLink>

            {openBurger ? (
              <div
                className=" absolute backdrop-blur-sm top-0 right-0 flex-col text-right z-20 p-4 rounded-bl-lg border-main-red text-white bg-strong-red"
                ref={navRef}
              >
                <button ref={burgerRef} onClick={toggleBurger}>
                  <img src={xMark} alt="Menu" className="h-6 mb-4" />
                </button>
                {loggedIn ? (
                  <NavLink
                    className="nav-link"
                    onClick={toggleBurger}
                    to={`/profile/${userId}`}
                  >
                    <p className="my-2">Profile</p>
                  </NavLink>
                ) : (
                  <div>
                    <p className="cursor-pointer" onClick={toggleLogin}>
                      Login
                    </p>
                    <NavLink
                      className="nav-link"
                      onClick={toggleBurger}
                      to="/signup"
                    >
                      <p className="my-2">Sign up</p>
                    </NavLink>
                  </div>
                )}
                {data.burger.map((link, index) => (
                  <NavLink
                    className="nav-link"
                    onClick={toggleBurger}
                    key={index}
                    to={link.link}
                  >
                    <p className={link.style}>{link.text}</p>
                  </NavLink>
                ))}
              </div>
            ) : (
              <>
                <button ref={btnRef} className="flex" onClick={toggleBurger}>
                  <img
                    src={burgerMenu}
                    alt="Menu"
                    className="h-7 m-2 justify-start laptop:hidden"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {open ? (
        <div
          onClick={handleClickOutside}
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-full bg-overlay backdrop-blur-sm flex items-center justify-center z-30"
        >
          <div
            ref={modalContentRef}
            className="w-2/3 tablet:w-1/3 desktop:w-3/12 my-20 rounded-lg bg-login border-main-red border-opacity-50 backdrop-blur-sm px-4 py-2 relative"
          >
            <div className="flex justify-between">
              <h1 className="font-heading text-text-light text-2xl my-4">
                Log In
              </h1>
              <NavLink to="/signup">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-main-red hover:bg-button-varm-medium hover:text-text-light transition duration-300 mb-4 justify-self-center px-6 py-2 rounded-full text-sm text-text-light"
                >
                  Sign up
                </button>
              </NavLink>
            </div>
            <form className="flex flex-col gap-2">
              <input
                value={emailInput}
                type="email"
                placeholder="Email..."
                className="p-2 rounded-lg"
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <input
                value={passwordInput}
                type="password"
                placeholder="Password..."
                className="p-2 rounded-lg"
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <button
                onClick={handleLogin}
                // disabled={loadingUser}
                className="bg-cta-blue my-4 px-6 py-2 rounded-full hover:bg-cta-blue-hover text-text-light"
              >
                {loadingUser ? (
                  <div className="flex items-center justify-center">
                    <span>Logging in...</span>
                    <Lottie
                      animationData={animation}
                      loop={true}
                      autoPlay
                      style={{ width: 30, height: 30, marginLeft: 8 }}
                    />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              {loginMessage ? loginMessage : "null"}
            </form>
            <p className="absolute text-text-light -bottom-10 tablet:-bottom-8 z-0  text-xs">
              Press outside of the box to close the window
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};
