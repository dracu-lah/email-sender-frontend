const isTesting = import.meta.env.VITE_TESTING === "true";
const permissionBased = import.meta.env.VITE_PERMISSION_BASED !== "false";
const devMode = import.meta.env.DEV;
const globalDateInputFormat = "yyyy-MM-dd'T'HH:mm:ss";
const globalDateDisplayFormat = "PPP";
export {
  isTesting,
  permissionBased,
  devMode,
  globalDateDisplayFormat,
  globalDateInputFormat,
};
