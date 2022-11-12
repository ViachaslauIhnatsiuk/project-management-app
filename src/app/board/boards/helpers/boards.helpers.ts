const getUserId = (): string | null => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const userId: string | null = JSON.parse(userData).id;
    return userId;
  }
  return null;
};

const getToken = (): string | null => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const token: string | null = JSON.parse(userData).token;
    return token;
  }
  return null;
};

export { getUserId, getToken };
