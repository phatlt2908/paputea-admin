<template>
  <div id="centerClassList">
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
            <input :value="false" v-model="statusSelecteds" type="checkbox" />
            Chưa phê duyệt
          </label>
          <label class="checkbox ml-4">
            <input :value="true" v-model="statusSelecteds" type="checkbox" />
            Đã phê duyệt
          </label>
        </div>
      </div>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Khối</th>
            <th>Môn</th>
            <th>Số buổi / tuần</th>
            <th>Yêu cầu</th>
            <th>Ngày đăng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(centerClassItem, index) in centerClassList" :key="index">
            <td>{{ centerClassItem.registerName }}</td>
            <td>{{ centerClassItem.registerPhone }}</td>
            <td>{{ centerClassItem.grade }}</td>
            <td>{{ centerClassItem.subject }}</td>
            <td>{{ centerClassItem.sessionsPerWeek }}</td>
            <td>{{ centerClassItem.note }}</td>
            <td>{{ formatDate(centerClassItem.registrationDate) }}</td>
            <td>
              <div v-if="centerClassItem.isConfirmed">Đã phê duyệt</div>
              <a
                v-else
                href="javascript:void(0)"
                @click="approve(centerClassItem)"
                >Phê duyệt</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import classApi from "../../services/classApi";

export default {
  name: "CenterClassList",
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      centerClassList: [],
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    getClassList() {
      classApi
        .getCenterClassList({
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
          this.centerClassList = res.data.centerClassList;
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
    approve(centerClass) {
      classApi
        .approveCenterClass(centerClass.id)
        .then(() => {
          centerClass.isConfirmed = true;
          this.$swal({
            icon: "success",
            title: "Approve thành công",
            timer: 3000,
            showConfirmButton: true,
            type: "success",
          });
        })
        .catch((err) => {
          console.error("Approve center class failed: " + err);
        });
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    },
  },
  watch: {
    statusSelecteds() {
      this.getClassList();
    },
  },
};
</script>
