import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { EndpointData } from "../services/apis/api";
import { castApi } from "../services/apis/cast-api";
import { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { API_KEY, API_SECRET } from "../../environment";

interface CastApiContextType {
  loading: boolean;
  call: (name: string, options: EndpointData) => Promise<AxiosResponse>;
}

const CastApiContext = createContext<CastApiContextType | undefined>(undefined);

export const CastApiProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState<{ authorization?: string }>({});

  async function authenticateRequest() {
    const response = await call("authenticate", {
      data: { apiKey: API_KEY, apiSecret: API_SECRET },
    });
    if (response.status === 200) {
      setHeaders({ authorization: response.data.token });
    }
  }

  const verifyToken = () => {
    const token = headers.authorization
  
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        const expirationDate = decodedToken.exp * 1000;
        const currentDate = new Date();
        const differenceInMilliseconds = expirationDate - currentDate.getTime();
  
        const pastDays = differenceInMilliseconds / (1000 * 3600 * 24);
  
        if (pastDays < 0) {
          setHeaders({})
          return false;
        }
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const verify = verifyToken();
    if (!verify) authenticateRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const call = async (name: string, { data, id, params }: EndpointData) => {
    setLoading(true);
    const response = await castApi[name]({ data, id, params, headers });
    setLoading(false);
    return response;
  };

  return (
    <CastApiContext.Provider value={{ loading, call }}>
      {children}
    </CastApiContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApiService = (): CastApiContextType => {
  const context = useContext(CastApiContext);
  if (!context) {
    throw new Error("useApiService must be used within a CastApiProvider");
  }
  return context;
};
