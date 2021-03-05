import { get } from "../../api";

const getWifis = async () => {
  return await get("/wifis/get/features"); //todo: should be a separate endpoint
};

const getFeatures = async () => {
  return await get("/wifis/get/features");
};

export { getWifis, getFeatures };
