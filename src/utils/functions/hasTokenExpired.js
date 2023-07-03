import jwtDecode from "jwt-decode";

export function hasTokenExpired(token) {
  const tokenDecode = jwtDecode(token);
  const expiredDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();

  if (currentDate > expiredDate) {
    return true;
  }

  return false;
}
