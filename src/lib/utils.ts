export const LoadToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const BASE_URL = process.env.NEXT_PUBLIC_API;
