<template>
  <div id="tutorClassList">
    <base-pagination
      v-if="totalPage && totalPage > 1"
      :totalPage="totalPage"
      :currentPage="pagination.currentPage"
      @changePage="getTutorClassList($event)"
    />
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Mã số</th>
          <th>Người đăng ký</th>
          <th>Khối</th>
          <th>Môn</th>
          <th>Số buổi / tuần</th>
          <th>Trình độ</th>
          <th>Địa chỉ</th>
          <th>Học phí</th>
          <th>Ngày đăng</th>
          <th v-if="isOnline">Loại lớp</th>
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
          <td>{{ classItem.registerName }}</td>
          <td>{{ classItem.grade }}</td>
          <td>{{ classItem.subject }}</td>
          <td>{{ classItem.sessionsPerWeek }}</td>
          <td>
            {{
              this.tutorTypeList.find((type) => type.id == classItem.tutorType)
                .name
            }}
          </td>
          <td>{{ classItem.addressProvince }}</td>
          <td>
            {{
              classItem.tuition && classItem.tuition > 0
                ? formatCurrency(classItem.tuition)
                : "? ₫"
            }}
          </td>

          <td>{{ formatDate(classItem.registrationDate) }}</td>
          <td v-if="isOnline">{{ classItem.isPersonal ? "1:1" : "Nhóm" }}</td>
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
</template>

<script>
import classApi from "../../services/classApi";

import commonConst from "../../constants/commonConst";
import BasePagination from "../components/BasePagination.vue";

import { formatCurrency } from "../../utils/stringUtil";

export default {
  components: { BasePagination },
  name: "ClassList",
  props: {
    isApproved: {
      type: Boolean,
      default: false,
    },
    tutorId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
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
    this.getTutorClassList(1);
  },
  methods: {
    getTutorClassList(page) {
      classApi
        .getTutorClassList({
          pagination: {
            itemsPerPage: 10,
            currentPage: page,
          },
          query: {
            isApproved: this.isApproved,
            tutorId: this.tutorId,
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
    formatCurrency(value) {
      return formatCurrency(value);
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(
        this.pagination.totalClasses / this.pagination.itemsPerPage
      );
    },
  },
};
</script>
