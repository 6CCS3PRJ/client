import {get} from "../../api";

const allWifis = async () => {
    return await get("/wifis");
};

export {allWifis};
