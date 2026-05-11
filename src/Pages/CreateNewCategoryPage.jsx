import Header from "../components/atoms/Header";
import Logo from "../components/atoms/Logo";
import NewCategoryForm from "../components/organisms/NewCategoryForm";

const CreateNewCategoryPage = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <NewCategoryForm />
    </>
  );
};

export default CreateNewCategoryPage;
