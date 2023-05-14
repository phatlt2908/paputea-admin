import axios from "../axios";
import classApiConst from "../constants/classApiConst";

class classApi {
  constructor() {
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("accessToken");
  }

  getClassList(data) {
    return axios.post(classApiConst.CLASS_LIST, data);
  }

  getClassDetail(id) {
    return axios.get(classApiConst.CLASS_DETAIL, { params: { id: id } });
  }

  approveClass(classId) {
    return axios.get(classApiConst.APPROVE_CLASS, {
      params: { classId: classId },
    });
  }

  approveRequestedClass(classId, tutorId) {
    return axios.get(classApiConst.APPROVE_REQUESTED_CLASS, {
      params: { classId: classId, tutorId: tutorId },
    });
  }

  undoApproveRequestedClass(classId) {
    return axios.get(classApiConst.UNDO_APPROVE_REQUESTED_CLASS, {
      params: { classId: classId },
    });
  }

  getTutorApproved(classId) {
    return axios.get(classApiConst.TUTOR_APPROVED, {
      params: { classId: classId },
    });
  }

  getTutorRequested(classId) {
    return axios.get(classApiConst.TUTOR_REQUESTED, {
      params: { classId: classId },
    });
  }

  getCenterClassList(data) {
    return axios.post(classApiConst.CENTER_CLASS_LIST, data);
  }

  approveCenterClass(centerClassId) {
    return axios.get(classApiConst.APPROVE_CENTER_CLASS, {
      params: { centerClassId: centerClassId },
    });
  }
}

export default new classApi();
