/*
  Fix for no types found error
*/
declare module "react-dom/client" {
  // typing module default export as `any` will allow you to access its members without compiler warning
  const createRoot: unknown;
  export default createRoot;
}
