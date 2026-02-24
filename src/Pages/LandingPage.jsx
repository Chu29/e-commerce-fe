import Logo from "../components/atoms/Logo";
import Hero from "../components/organisms/Hero";
import Header from "../components/atoms/Header";

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
