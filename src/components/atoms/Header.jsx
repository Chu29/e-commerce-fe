const Header = ({ children }) => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white px-4 sm:px-6 py-3 shadow-sm sticky top-0 z-10">
      {children}
    </header>
  );
};

export default Header;
