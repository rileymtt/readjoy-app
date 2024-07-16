export const ACCESS_TOKEN_KEY = process.env.REACT_APP_ACCESS_TOKEN_KEY
  ? process.env.REACT_APP_ACCESS_TOKEN_KEY
  : "LouyiO1igij54zszbC7FlwRe0uxZ";
export const DEVICE_KEY = "uU5tEUmAgvBWArsv";
export const SCOPES_KEY = "AhBcmvr1EkMdPnL5";
export let AppConfig: { WS: string; API: string; ETHERSCAN_LINK: string } = {
  WS: process.env.REACT_APP_WS_URL
    ? process.env.REACT_APP_WS_URL
    : "https://apicommunity.feliciastation.com",
  API: process.env.EXPO_PUBLIC_API_URL
    ? process.env.EXPO_PUBLIC_API_URL
    : `https://apicommunity.feliciastation.com/api/v1`,
  ETHERSCAN_LINK: "",
};

console.log(AppConfig);
