import { IAuthState } from './models/auth.models';

const initialAuthState: IAuthState = {
  token: '',
  isAuth: false,
  isLoading: false,
  error: {
    statusCode: '',
    message: '',
  },
};

export { initialAuthState };
