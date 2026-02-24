import Logo from "../components/atoms/Logo";
import Header from "../components/atoms/Header";
import NewProductForm from "../components/organisms/NewProductForm";

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
