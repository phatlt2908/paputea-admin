<template>
  <div id="classList">
    <h1>Danh sách đăng ký học tại trung tâm</h1>
    <div class="content">
      <div class="search">
        <div class="field has-addons">
          <div class="control">
            <input
              v-model="keywordSearch"
              class="input"
              type="text"
              placeholder="Tìm kiếm..."
            />
          </div>
          <div class="control">
            <a @click="getClassList" class="button is-info">
              <font-awesome-icon icon="magnifying-glass" />
            </a>
          </div>
        </div>
        <div class="status-search mb-4">
          <label class="checkbox">
            <input :value="10" v-model="statusSelecteds" type="checkbox" />
            Chưa phê duyệt
          </label>
          <label class="checkbox ml-4">
            <input :value="20" v-model="statusSelecteds" type="checkbox" />
            Đã phê duyệt
          </label>
          <label class="checkbox ml-4">
            <input :value="30" v-model="statusSelecteds" type="checkbox" />
            Đã bàn giao
          </label>
        </div>
      </div>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Mã số</th>
            <th>Khối</th>
            <th>Môn</th>
            <th>Số buổi / tuần</th>
            <th>Trình độ</th>
            <th>Địa chỉ</th>
            <th>Yêu cầu</th>
            <th>Học phí</th>
            <th>Ngày đăng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(classItem, index) in classList" :key="index">
            <td>{{ classItem.classCode }}</td>
            <td>{{ classItem.grade }}</td>
            <td>{{ classItem.subject }}</td>
            <td>{{ classItem.sessionsPerWeek }}</td>
            <td>
              {{
                this.tutorTypeList.find(
                  (type) => type.id == classItem.tutorType
                ).name
              }}
            </td>
            <td>{{ classItem.addressProvince }}</td>
            <td>{{ classItem.note }}</td>
            <td>{{ classItem.tuition }}</td>
            <td>{{ formatDate(classItem.registrationDate) }}</td>
            <td>
              {{
                this.statusList.find((status) => status.id == classItem.status)
                  .name
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import classApi from "../../services/classApi";

import commonConst from "../../constants/commonConst";

export default {
  name: "ClassList",
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      classList: [],
      tutorTypeList: commonConst.TUTOR_TYPE_LIST,
      statusList: commonConst.STATUS_LIST,
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    getClassList() {
      classApi
        .getClassList({
          pagination: {
            itemsPerPage: 10,
            currentPage: 1,
          },
          query: {
            statusSelecteds: this.statusSelecteds,
            keywordSearch: this.keywordSearch,
          },
        })
        .then((res) => {
          this.classList = res.data.classList;
        })
        .catch((err) => {
          console.error("Load class list failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được danh sách lớp :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    },
    classPost() {
      this.$swal({
        icon: "warning",
        title: "Chắc chắn xóa bài viết?",
        showDenyButton: true,
        denyButtonText: "Xóa",
        showCancelButton: true,
        cancelButtonText: "Quay xe",
        showConfirmButton: false,
        type: "warning",
      }).then((result) => {
        if (result.isDenied) {
          this.$swal({
            icon: "error",
            title: "Tính năng đang phát triển, Vui lòng thử lại sau!",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        }
      });
    },
  },
  watch: {
    statusSelecteds() {
      this.getClassList();
    },
  },
};
</script>
