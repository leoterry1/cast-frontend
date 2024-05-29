import { ColorRing } from "react-loader-spinner";
import { useApiService } from "./cast-api-context";

const Loader = () => {
  const { loading } = useApiService();

  if (!loading) return null;

  return (
    <div>
      <div className="absolute w-screen h-screen bg-white opacity-50 z-40"/>
      <div className="absolute w-screen h-screen z-50">
      <ColorRing
        visible={loading}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass="color-ring-wrapper"
        colors={["#C07FDE", "#F6DBFF", "#600C87", "#F6DBFF", "#849b87"]}
      />
      </div>
    </div>
  );
};

export default Loader;
