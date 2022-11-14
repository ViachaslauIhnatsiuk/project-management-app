import jwtDecode from 'jwt-decode';

const getUserId = (): string | null => {
  const TOKEN = window.localStorage.getItem('token') as string;
  const { id } = jwtDecode<{ id: string }>(TOKEN);
  return id;
};

const getToken = (): string | null => window.localStorage.getItem('token');

export { getUserId, getToken };
