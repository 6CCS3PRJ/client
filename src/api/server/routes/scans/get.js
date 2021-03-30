import {get} from '../../api';

const getUploadStats = async () => {
  return await get('/scans/get/uploadStats');
};

export {getUploadStats};
