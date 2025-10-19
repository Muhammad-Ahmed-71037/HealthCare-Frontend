import { WEBLOGO } from "../../assets/labels/logo";

const Navbar = () => {
  return (
    <div className="container">
      <img
        src={WEBLOGO}
        alt="healthMade"
        className="h-14 md:h-16 lg:h-20 w-auto object-contain"
      />
    </div>
  );
};

export default Navbar;
