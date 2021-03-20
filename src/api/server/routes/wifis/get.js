import { get } from "../../api";

const getFeatures = async () => {
  return await get("/wifis/get/features");
};

export { getFeatures };
