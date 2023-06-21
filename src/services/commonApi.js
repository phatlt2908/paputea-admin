import axios from "../axios";
import commonApiConst from "@/constants/commonApiConst";

class commonApi {
  constructor() {
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("accessToken");
  }

  uploadImage(data) {
    return axios.post(commonApiConst.UPLOAD_IMAGE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new commonApi();
