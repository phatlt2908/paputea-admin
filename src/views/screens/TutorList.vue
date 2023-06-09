<template>
  <div id="tutorList">
    <h1>Quản lý gia sư</h1>
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
            <a @click="getTutorList" class="button is-info">
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
        </div>
      </div>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Mã số</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Ngày đăng ký</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tutorItem, index) in tutorList" :key="index">
            <td>
              <router-link
                :to="{
                  name: 'tutorDetail',
                  query: { tutorId: tutorItem.id },
                }"
              >
                {{ tutorItem.tutorCode }}
              </router-link>
            </td>
            <td>{{ tutorItem.tutorName }}</td>
            <td>{{ tutorItem.phone }}</td>
            <td>{{ formatDate(tutorItem.registrationDate) }}</td>
            <td>
              {{ tutorItem.isApproved ? "Đã phê duyệt" : "Chưa phê duyệt" }}
            </td>
          </tr>
        </tbody>
      </table>
      <base-pagination
        v-if="totalPage && totalPage > 1"
        :totalPage="totalPage"
        :currentPage="pagination.currentPage"
        @changePage="getTutorList($event)"
      />
    </div>
  </div>
</template>

<script>
import tutorApi from "../../services/tutorApi";
import BasePagination from "../components/BasePagination.vue";

export default {
  name: "TutorList",
  components: { BasePagination },
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      tutorList: [],
      pagination: {
        currentPage: 1,
        itemsPerPage: 0,
        totalItems: 0,
      },
    };
  },
  created() {
    this.getTutorList();
  },
  methods: {
    getTutorList(page) {
      tutorApi
        .getTutorList({
          pagination: {
            itemsPerPage: 20,
            currentPage: page,
          },
          query: {
            statusSelecteds: this.statusSelecteds,
            keywordSearch: this.keywordSearch,
          },
        })
        .then((res) => {
          this.tutorList = res.data.tutorList;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.error("Load tutor list failed ", err);
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
        this.pagination.totalItems / this.pagination.itemsPerPage
      );
    },
  },
  watch: {
    statusSelecteds() {
      this.getTutorList();
    },
  },
};
</script>
