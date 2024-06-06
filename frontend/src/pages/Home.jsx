
import { Carousel } from "../components/Carousel";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";

import { ReviewCard } from "../components/ReviewCard";
import { Statements } from "../components/Statements";

export const Home = ({ data }) => {
  return (

    <div className="flex flex-col bg-main-red">
      <Hero data={data["hero"]} />
      <Carousel />
      <Statements data={data["atGlim"] } />
      <ReviewCard />
    </div>
  );
};
