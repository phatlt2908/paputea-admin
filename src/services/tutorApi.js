import tutorApiConst from "@/constants/tutorApiConst";
import axios from "../axios";

class tutorApi {
  constructor() {
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("accessToken");
  }

  getTutorList(data) {
    return axios.post(tutorApiConst.TUTOR_LIST, data);
  }
}

export default new tutorApi();
