import Logo from "../components/atoms/Logo";
import Header from "../components/molecules/Header";
import EditProductForm from "../components/EditProductForm";

const EditProductPage = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <EditProductForm />
    </>
  );
};

export default EditProductPage;
