<template>
  <div id="tutorDetail" class="section">
    <div v-if="classDetail">
      <h1>Thông tin đăng ký tìm kiếm gia sư</h1>
      <div class="is-size-7 mb-4">
        Ngày đăng: {{ formatDate(classDetail.registrationDate) }}
      </div>
      <div class="mb-1">
        <span class="ml-2">Trạng thái:</span>
        <span class="ml-2 has-text-weight-bold">
          {{
            classStatusList.find((status) => status.id == classDetail.status)
              .name
          }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Học phí:</span>
        <span class="ml-2 has-text-weight-bold">
          {{
            classDetail.tuition && classDetail.tuition > 0
              ? formatCurrency(classDetail.tuition)
              : "? ₫"
          }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Khối lớp:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.grade }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Môn học:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.subject }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Số buổi / tuần:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.sessionsPerWeek }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Trình độ yêu cầu:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorTypeList.find((e) => e.id == classDetail.tutorType).name }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Địa chỉ:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.addressDetail }}, {{ classDetail.addressProvince }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Ngày bắt đầu học:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ formatDate(classDetail.openingDay) }}
        </span>
      </div>
      <div v-if="classDetail.note" class="mb-2 mt-2">
        <article class="message is-warning">
          <div class="message-header">
            <p>Yêu cầu</p>
          </div>
          <div class="message-body">{{ classDetail.note }}</div>
        </article>
      </div>
    </div>
    <div v-else>Loading...</div>
    <h2 class="mt-5">
      <span>Gia sư đang đứng lớp: </span>
      <span v-if="tutorApprovedInfo">
        <router-link
          :to="{
            name: 'tutorDetail',
            query: { tutorId: tutorApprovedInfo.tutorId },
          }"
        >
          {{ `${tutorApprovedInfo.tutorName} (${tutorApprovedInfo.tutorPhone})` }}
        </router-link>
      </span>
      <span v-else>[Chưa phân bổ]</span>
    </h2>
  </div>
</template>

<script>
import classApi from "../../services/classApi";

import commonConst from "../../constants/commonConst";

export default {
  name: "TutorDetail",
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      classDetail: null,
      tutorApprovedInfo: null,
      tutorTypeList: commonConst.TUTOR_TYPE_LIST,
      classStatusList: commonConst.CLASS_STATUS_LIST,
    };
  },
  created() {
    if (this.$route.query.classId) {
      this.getClassDetail(this.$route.query.classId);
      this.getTutorApproved(this.$route.query.classId);
    }
  },
  methods: {
    getClassDetail(classId) {
      classApi
        .getClassDetail(classId)
        .then((res) => {
          this.classDetail = res.data;
        })
        .catch((err) => {
          console.error("Load class detail failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được thông tin lớp :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    getTutorApproved(classId) {
      classApi
        .getTutorApproved(classId)
        .then((res) => {
          this.tutorApprovedInfo = res.data;
        })
        .catch((err) => {
          console.error("Load class tutor approved failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được thông tin gia sư đứng lớp :(",
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
};
</script>
