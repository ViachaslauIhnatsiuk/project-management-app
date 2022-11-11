import { IAuthState } from './models/auth.models';

const initialAuthState: IAuthState = {
  userId: '',
  userName: '',
  userLogin: '',
  token: '',
  isLoading: false,
  error: {
    statusCode: '',
    message: '',
    type: '',
  },
};

export { initialAuthState };
