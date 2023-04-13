import axios from "../axios"
import classApiConst from "../constants/classApiConst"

class classApi {
    constructor() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('accessToken');
    }

    getCategoryPulldown() {
        return axios.post(classApiConst.CATEGORY_PULLDOWN)
    }

    getLinkDownloadTypePulldown() {
        return axios.post(classApiConst.LINK_DOWNLOAD_TYPE_PULLDOWN)
    }

    getClassList(data) {
        return axios.post(classApiConst.CLASS_LIST, data)
    }

    saveClass(data) {
        return axios.post(classApiConst.CLASS_SAVE, data)
    }
}

export default new classApi()