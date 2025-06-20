export const useCheckToken = () => {
  const token = localStorage.getItem("access_token");
  return { isLoggedIn: !!token };
};
