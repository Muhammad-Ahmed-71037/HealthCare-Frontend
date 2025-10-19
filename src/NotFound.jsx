import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-neutral-700 text-white text-center p-6">
      <h1 className="text-[8vw] font-bold leading-none m-0">404</h1>
      <h2 className="text-[4vw] font-medium my-2">Page Not Found</h2>
      <p className="max-w-xl text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md transition duration-300 hover:bg-neutral-800"
      >
        Go Back Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
