<template>
  <div id="classList">
    <h1>{{ title }}</h1>
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
      <base-pagination
        v-if="totalPage && totalPage > 1"
        :totalPage="totalPage"
        :currentPage="pagination.currentPage"
        @changePage="getClassList($event)"
      />
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
            <td>
              <router-link
                :to="{ name: 'classDetail', query: { classId: classItem.id } }"
              >
                {{ classItem.classCode }}
              </router-link>
            </td>
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
            <td
              :class="
                this.statusList.find((status) => status.id == classItem.status)
                  .color
              "
            >
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
import BasePagination from "../components/BasePagination.vue";

export default {
  components: { BasePagination },
  name: "ClassList",
  props: {
    title: {
      type: String,
      default: "",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      classList: [],
      tutorTypeList: commonConst.TUTOR_TYPE_LIST,
      statusList: commonConst.CLASS_STATUS_LIST,
      pagination: {
        currentPage: 1,
        itemsPerPage: 0,
        totalClasses: 0,
      },
    };
  },
  created() {
    this.getClassList(1);
  },
  methods: {
    getClassList(page) {
      classApi
        .getClassList({
          pagination: {
            itemsPerPage: 10,
            currentPage: page,
          },
          query: {
            isOnline: this.isOnline,
            statusSelecteds: this.statusSelecteds,
            keywordSearch: this.keywordSearch,
          },
        })
        .then((res) => {
          this.classList = res.data.classList;
          this.pagination = res.data.pagination;
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
  },
  computed: {
    totalPage() {
      return Math.ceil(
        this.pagination.totalClasses / this.pagination.itemsPerPage
      );
    },
  },
  watch: {
    statusSelecteds() {
      this.getClassList();
    },
  },
};
</script>
