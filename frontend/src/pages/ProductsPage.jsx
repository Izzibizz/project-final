import { useEffect, useMemo, useState } from "react";

import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { ProductCard } from "../components/ProductCard";
import { ShoppingCartPopup } from "../components/ShoppingCartPopup";
import { useProductsStore } from "../store/useProductsStore";
import { useUserStore } from "../store/useUserStore";

export const ProductsPage = () => {
  const { productsData, fetchProducts, loadingProduct, addedProduct } =
    useProductsStore();
  const { loggedIn, user } = useUserStore();
  const [categoryValue, setCategoryValue] = useState("category");
  const [sortValue, setSortValue] = useState("sort");
  const [filterValue, setFilterValue] = useState("filter");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const profile = user;

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on category and filter values
  useEffect(() => {
    let newFilteredProducts = productsData.products || [];

    if (loggedIn && filterValue !== "all") {
      setFilterValue("recommended");
    }

    if (categoryValue !== "category" && categoryValue !== "all") {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.category && product.category === categoryValue
      );
    }

    if (filterValue !== "filter" && filterValue !== "all") {
      if (filterValue === "recommended" && loggedIn) {
        newFilteredProducts = newFilteredProducts.filter((product) => {
          const isMatchingProfile =
            (product.skin &&
              profile.skin.some((skinType) =>
                product.skin.includes(skinType)
              )) ||
            (product.hair &&
              (product.hair.moisture.some((moistureType) =>
                profile.hair.moisture.includes(moistureType)
              ) ||
                product.hair.shape.some((shapeType) =>
                  profile.hair.shape.includes(shapeType)
                )));

          const isMatchingPros =
            ((profile.pros && product.category === "Nail care") ||
              product.category === "Beard care") &&
            product.pros &&
            product.pros.some((pro) => profile.pros.includes(pro));

          const isNotAllergic =
            !profile.allergies ||
            (product.allergies &&
              profile.allergies.every(
                (allergy) => !product.allergies.includes(allergy)
              ));

          return isMatchingProfile || (isMatchingPros && isNotAllergic);
        });
      } else {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.pros && product.pros.includes(filterValue)
        );
      }
    }

    setFilteredProducts(newFilteredProducts);
  }, [categoryValue, filterValue, productsData.products, loggedIn, profile]);

  // Sort filtered products based on sort value
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    if (sortValue === "lowest price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortValue === "highest price") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [sortValue, filteredProducts]);

  console.log("Filtered Product:", filteredProducts);
  console.log("added", addedProduct);
  console.log(filterValue);
  console.log(sortValue);

  return (
    <>
      <ShoppingCartPopup />
      <section className="bg-main-red h-full min-h-screen w-full pt-12 laptop:pt-28">
        <div className="font-heading flex flex-col items-center justify-between w-11/12 m-auto mb-8 tablet:w-9/12 desktop:flex-row">
          <h2 className="text-text-light text-2xl  tablet:text-3xl laptop:text-3xl text-center mb-6 desktop:mb-0">
            {loggedIn && filterValue === "recommended"
              ? "Recommended Products"
              : "Products"}
          </h2>
          <div className="flex flex-col gap-2 tablet:gap-2 tablet:flex-row ">
            <form>
              <select
                name="Filter"
                value={filterValue}
                onChange={handleFilterChange}
                className="appearance-none bg-button-varm-light px-4 py-1 rounded-xl text-sm text-center w-40 tablet:w-fit"
              >
                {loggedIn ? (
                  <>
                    <option value="recommended" className="bg-button-light">
                      Recommended
                    </option>
                    <option value="all" className="bg-button-light">
                      Show all
                    </option>
                  </>
                ) : (
                  <>
                    <option value="filter" disabled hidden>
                      Filter
                    </option>
                    <option value="organic" className="bg-button-light">
                      Organic
                    </option>
                    <option value="crueltyfree" className="bg-button-light">
                      {" "}
                      Cruelty free
                    </option>
                    <option value="vegan" className="bg-button-light">
                      Vegan
                    </option>
                    <option value="all" className="bg-button-light">
                      Show all
                    </option>
                  </>
                )}
              </select>
            </form>
            <form>
              <select
                name="category-filter"
                value={categoryValue}
                onChange={handleCategoryChange}
                className="appearance-none bg-button-varm-light px-4 py-1 rounded-xl text-sm text-center w-40 tablet:w-fit"
              >
                <option value="category" disabled hidden>
                  Category
                </option>
                <option value="Skincare" className="bg-button-light">
                  Skin care
                </option>
                <option value="Hair Care" className="bg-button-light">
                  Hair care
                </option>
                <option value="Nail Care" className="bg-button-light">
                  Nail care
                </option>
                <option value="Beard Care" className="bg-button-light">
                  Beard care
                </option>
                <option value="all" className="bg-button-light">
                  Show all
                </option>
              </select>
            </form>
            <form>
              <select
                name="Sort"
                value={sortValue}
                onChange={handleSortChange}
                className="appearance-none bg-button-varm-light px-4 py-1 rounded-xl text-sm text-center w-40 tablet:w-fit"
              >
                <option value="sort" disabled hidden>
                  Sort
                </option>
                <option value="lowest price" className="bg-button-light">
                  Lowest price
                </option>
                <option value="highest price" className="bg-button-light">
                  Highest price
                </option>
              </select>
            </form>
          </div>
        </div>
        {loadingProduct ? (
          <Loading />
        ) : (
          <ul className=" w-11/12 m-auto grid grid-cols-2 gap-6 tablet:grid-cols-4 tablet:w-9/12 laptop:grid-cols-5 desktop:grid-cols-6">
            {sortedProducts &&
              sortedProducts.map((item, index) => (
                <li key={index} className="w-full">
                  <ProductCard data={item} />
                </li>
              ))}
          </ul>
        )}
      </section>
      {/* add the X of the bg-main-X to the aboveColor to make the Footer match*/}
      <Footer aboveColor={"red"} />
    </>
  );
};
