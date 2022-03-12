import { useEffect, useState } from "react";
import ProductsGrid from "../../components/products/ProductsGrid";
import StoreHeader from "../../components/header/StoreHeader";
import Footer from "../../components/footer/Footer";
import "../homepage/home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Shop = ({ setSearch, search }) => {
  useEffect(() => {
    document.body.classList.remove("noscroll-web");
    document.body.classList.remove("trans");
  }, []);

  const [customer, setCustomer] = useState(1);
  return (
    <>
      <StoreHeader customer={customer} customerChange={(e) => setCustomer(e)} />
      <ProductsGrid setSearch={setSearch} search={search} customer={customer} />
    </>
  );
};

export default Shop;
