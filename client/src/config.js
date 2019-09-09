const GIPHY_API_KEY = {
  GIPHY_API_KEY: "VeDb98Oa9mfgYQzxRe4DU4TRW97TGU1O"
};

const config =
  process.env.NODE_ENV === "development" ? GIPHY_API_KEY : GIPHY_API_KEY;
export default config;
