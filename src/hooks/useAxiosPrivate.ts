import { axiosPrivate } from '../utils/httpRequest';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '../store/user/userSelector';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = useSelector(accessTokenSelector);

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          return config;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return axiosPrivate(prevRequest);
          } catch (e) {
            return Promise.reject(e);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [refresh, accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
