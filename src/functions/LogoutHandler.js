import Swal from "sweetalert2";

const logoutHandler = async (navigate) => {
  const response = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from your account.",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
    cancelButtonText: "No, stay here",
    reverseButtons: true,
  });

  if (response.isConfirmed) {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
};
export default logoutHandler;
