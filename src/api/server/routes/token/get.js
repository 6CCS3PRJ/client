import {get} from "../../api";

const getToken = async () => {
  return await get("/token/get/new");
};

export {getToken};
