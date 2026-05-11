import Logo from "../components/atoms/Logo";
import Header from "../components/atoms/Header";
import EditProductForm from "../components/organisms/EditProductForm";

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
