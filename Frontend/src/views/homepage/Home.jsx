import { useEffect, useState } from "react";
import ProductsGrid from "../../components/products/ProductsGrid";
import StoreHeader from "../../components/header/StoreHeader";
import Footer from "../../components/footer/Footer";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Carosels = () => {
  const HomeBody1 = [
    "https://www.zataru.com/wp-content/uploads/2021/04/Perfume-Brand-Banner-Desktop.jpg",
    "https://images.unsplash.com/photo-1554057009-4bb718be3f32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  ];

  return (
    <div style={{"margin-top":"3rem"}}>
      <Carousel dynamicHeight={true} infiniteLoop={true} showThumbs={false}>
        {HomeBody1.map((items) => (
          <div>
            <img class="d-block w-100 crop-image" src={items} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
const Home = ({setSearch,search}) => {
  useEffect(() => {
    document.body.classList.remove("noscroll-web");
    document.body.classList.remove("trans");
  }, []);

  const [customer, setCustomer] = useState(1);
  return (
    <>
      <Carosels />
      <a href="#">
        <marquee
          class="GeneratedMarquee"
          direction="left"
          scrollamount="50"
          behavior="scroll"
        >
          Discount Image.....
        </marquee>
      </a>
      <ProductsGrid setSearch={setSearch} search={search} customer={customer} />
      <Footer />
    </>
  );
};

export default Home;
