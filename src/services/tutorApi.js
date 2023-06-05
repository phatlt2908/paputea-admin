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

  getTutorDetail(id) {
    return axios.get(tutorApiConst.TUTOR_DETAIL, { params: { id: id } });
  }

  approveTutor(id) {
    return axios.get(tutorApiConst.TUTOR_APPROVAL, {
      params: { id: id },
    });
  }
}

export default new tutorApi();
