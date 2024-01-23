import Cookies from "universal-cookie";

export const API_URL = "http://localhost:5000";

export const formatLargeMonetaryNumber: any = (number: number) => {
  if (number < 0) {
    return "-" + formatLargeMonetaryNumber(-1 * number);
  }
  if (number < 1000) {
    return "$" + number;
  } else if (number >= 1000 && number < 1_000_000) {
    return "$" + (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return "$" + (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return "$" + (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return "$" + (number / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatLargeNonMonetaryNumber: any = (number: number) => {
  if (number < 0) {
    return "-" + formatLargeMonetaryNumber(-1 * number);
  }
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatRatio = (ratio: number) => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};

export const getJWTCookie = () => {
  const cookies = new Cookies();
  const jwtToken = cookies.get("jwtToken");

  if (jwtToken === undefined) {
    return null;
  }
  return jwtToken;
};

export const decodeToken = (jwtToken: string) => {
  // console.log(jwtToken);
  return JSON.parse(atob(jwtToken.split(".")[1]));
};
