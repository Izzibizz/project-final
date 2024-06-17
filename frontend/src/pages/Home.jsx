import { useEffect } from "react";

import { Carousel } from "../components/Carousel";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { ReviewCard } from "../components/ReviewCard";
import { ShoppingCartPopup } from "../components/ShoppingCartPopup";
import { Statements } from "../components/Statements";
import { WelcomeMessage } from "../components/WelcomeMessage";
import { useUserStore } from "../store/useUserStore";

export const Home = ({ data }) => {
  const {
    signedUp,
    setSignedUp,
    loggedOut,
    setLoggedOut,
    automaticLogOut,
    setAutomaticLogOut,
  } = useUserStore();

  useEffect(() => {
    if (signedUp) {
      setTimeout(() => {
        setSignedUp(false);
      }, 3000);
    }
  }, [signedUp]);

  useEffect(() => {
    if (loggedOut) {
      setTimeout(() => {
        setLoggedOut(false);
      }, 1500);
    }
  }, [loggedOut]);

  useEffect(() => {
    if (automaticLogOut) {
      setTimeout(() => {
        setAutomaticLogOut(false);
      }, 1500);
    }
  }, [automaticLogOut]);

  return (
    <>
      <main className="flex flex-col bg-main-red">
        {signedUp && <WelcomeMessage />}
        {loggedOut && <WelcomeMessage />}
        {automaticLogOut && <WelcomeMessage />}
        <ShoppingCartPopup />
        <Hero data={data["hero"]} />
        <Carousel />
        <Statements data={data["atGlim"]} />
      </main>
      {/* add the X of the bg-main-X to the aboveColor to make the Footer match*/}
      <Footer data={data["footer"]} aboveColor={"yellow"} />
    </>
  );
};
