import { get } from "../../api";

const getFeatures = async () => {
  return await get("/wifis/get/features");
};

const getScanCounts = async ()=>{
  return await get("/wifis/get/scanCounts");
}

export { getFeatures, getScanCounts };
