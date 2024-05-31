import mockup1 from "/mockupimages/mockup1.jpg";

export const ProductCard = ({ data, langData }) => {
  const productData = data;
  const langData = langData; //Should probably be products-list-page

  //Change variables to accept incoming data from backend.
  const image = mockup1; //replace mockup1 with productData.image
  const productName = "Product name"; //productData.name
  const price = `€Price`; //`€${productData.price}`

  // Change variable to accept data from translation file.
  const addToCart = "Add to Cart"; //langData.add-to-cart

  return (
    <div className="bg-strong-red m-auto w-2/3 rounded-xl">
      <img className="w-100% rounded-t-xl" src={image} alt="" />
      <div className="m-2 flex flex-col items-center text-white">
        <h3 className="font-heading">{productName}</h3>
        <p className="font-body my-2">{price}</p>
        <button className="w-28 bg-button-light my-2 rounded-full text-text-dark">
          {addToCart}
        </button>
      </div>
    </div>
  );
};
