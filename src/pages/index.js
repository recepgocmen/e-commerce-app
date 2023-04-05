import Navbar from "../../public/components/Navbar";
import MainArea from "../../public/components/MainArea";

const Home = () => {
  return (
    <>
      <Navbar /> {/*  includes logo, darkmode,cart and favourites icons */}
      <MainArea /> {/*  includes welcome title and product cards */}
    </>
  );
};

export default Home;
