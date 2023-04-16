import axios from "../axios"
import classApiConst from "../constants/classApiConst"

class classApi {
    constructor() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('accessToken');
    }

    getClassList(data) {
        return axios.post(classApiConst.CLASS_LIST, data)
    }

    getCenterClassList(data) {
        return axios.post(classApiConst.CENTER_CLASS_LIST, data)
    }
}

export default new classApi()