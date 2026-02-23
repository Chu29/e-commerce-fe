import Logo from "../components/atoms/Logo";
import Header from "../components/molecules/Header";
import NewProductForm from "../components/NewProductForm";

const CreateProductPage = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <NewProductForm />
    </>
  );
};

export default CreateProductPage;
