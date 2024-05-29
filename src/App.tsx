import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "./routes";
import { ComponentLoader } from "./utils/routes/component-loader";
import { AuthProvider } from "./services/auth";
import { Toaster } from "react-hot-toast";
import { CastApiProvider } from "./components/cast-api-context";
import Loader from "./components/loader";

const App = () => {
  return (
    <CastApiProvider>
      <Loader/>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            {routeList.map((route, i) => {
              return (
                <Route
                  key={i}
                  path={route.route()}
                  Component={() => <ComponentLoader route={route} />}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CastApiProvider>
  );
};

export default App;
