import * as httpRequest from '../utils/httpRequest';

import store from '../store/store';
import { logginSuccess } from '../store/user/userSlice';

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const res: any = await httpRequest.axiosPrivate.get('/user/refresh');

      store.dispatch(
        logginSuccess({ accessToken: res.data.token, user: res.data.data.user })
      );

      return res.data.token;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
