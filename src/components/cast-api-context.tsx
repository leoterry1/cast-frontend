import { createContext, useState, PropsWithChildren, useContext } from 'react';
import { EndpointData } from '../services/apis/api';
import { castApi } from '../services/apis/cast-api';
import { AxiosResponse } from 'axios';

interface CastApiContextType {
  loading: boolean;
  call: (name: string, options: EndpointData) => Promise<AxiosResponse>;
}

const CastApiContext = createContext<CastApiContextType | undefined>(undefined);

export const CastApiProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const call = async (name: string, { data, id, params }: EndpointData) => {
    setLoading(true);
    const response = await castApi[name]({ data, id, params });
    setLoading(false);
    return response;
  }

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
    throw new Error('useApiService must be used within a CastApiProvider');
  }
  return context;
};
