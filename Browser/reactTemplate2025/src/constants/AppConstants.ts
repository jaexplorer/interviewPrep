export const SIZES = {
  sm: 560,
  md: 780,
  lg: 1024,
  lgMax: 1366,
};

export const PASSWORD_PATTERN = /(?=.{8,32})/;
export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_PATTERN = /^([A-Za-z])([A-Za-z0-9]+)/;
export const MOBILE_PATTERN = /^04([\d]){8}$/;
