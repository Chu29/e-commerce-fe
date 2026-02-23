import Logo from "../components/atoms/Logo";
import Hero from "../components/Hero";
import Header from "../components/molecules/Header";

const LandingPage = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Hero />
    </>
  );
};

export default LandingPage;
