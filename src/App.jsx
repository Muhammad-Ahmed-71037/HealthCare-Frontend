import { RouterProvider } from "react-router-dom";
import Network from "./Network.jsx";
import router from "./Rounting/routing.jsx";

function App() {
  return (
    <>
      <Network />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
