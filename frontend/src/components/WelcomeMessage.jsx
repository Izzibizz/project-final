import Lottie from "lottie-react";
import { useState } from "react";

import animation from "../assets/animation-success.json";
import { useUserStore } from "../store/useUserStore";

export const WelcomeMessage = () => {
  const { user, loggedIn, signedUp, automaticLogOut, loggedOut } =
    useUserStore();

  const [open, setOpen] = useState(true);

  const getTitleMessage = () => {
    if (loggedIn && user) return `Welcome ${user.user.firstname}`;
    if (signedUp) return "Your signup was successful";
    if (loggedOut) return "You have been logged out";
    if (automaticLogOut) return "You have been automatically logged out";
    return "";
  };

  const getDescriptionMessage = () => {
    if (loggedIn) return "You have been successfully logged in";
    if (signedUp)
      return "Proceed to login to see your personal recommendations";
    if (loggedOut) return `See you later!`;
    if (automaticLogOut)
      return "Please log in again if you want your personal recommendations";
    return "";
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-overlay backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-2/3 tablet:w-1/3 desktop:w-3/12 my-20 rounded-lg bg-login border-main-red border-opacity-50 backdrop-blur-sm p-8 relative flex justify-between">
        <div className="font-heading text-text-light">
          <h2 className="text-xl mb-4">{getTitleMessage()}</h2>
          <p className="text-sm">{getDescriptionMessage()}</p>
          {/*           {(signedUp || automaticLogOut) && (
            <button className="bg-cta-blue my-4 px-6 py-2 rounded-full hover:bg-cta-blue-hover text-text-light">
              Log in
            </button>
          )}  This code doesnt work since the login popup is inside of the nav comp atm*/}
        </div>
        <Lottie
          animationData={animation}
          loop={false}
          autoPlay
          style={{ width: 100, height: 100 }}
        />
      </div>
    </div>
  );
};
