import { randomUnsplashUrls } from "../constants";

const imageUrl = () => {
  return randomUnsplashUrls[Math.floor(Math.random() * 89)];
};

export default imageUrl;
