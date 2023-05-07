<template>
  <div id="classList">
    <h1>Thông tin đăng ký tìm kiếm gia sư</h1>
    <div v-if="classDetail" class="section">
      <div class="is-size-7">
        Ngày đăng: {{ formatDate(classDetail.registrationDate) }}
      </div>
      <h4 class="title is-4 color-primary my-4">
        {{
          classDetail.tuition && classDetail.tuition > 0
            ? formatCurrency(classDetail.tuition)
            : "? ₫"
        }}
      </h4>
      <div class="icon-text mb-1">
        <span class="icon">
          <FontAwesomeIcon icon="{faGraduationCap}" />
        </span>
        <span class="ml-2">Khối lớp:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.grade }}
        </span>
      </div>
      <div class="icon-text mb-1">
        <span class="icon">
          <FontAwesomeIcon icon="{faBook}" />
        </span>
        <span class="ml-2">Môn học:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.subject }}
        </span>
      </div>
      <div class="icon-text mb-1">
        <span class="icon">
          <FontAwesomeIcon icon="{faHashtag}" />
        </span>
        <span class="ml-2">Số buổi / tuần:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.sessionsPerWeek }}
        </span>
      </div>
      <div class="icon-text mb-1">
        <span class="icon">
          <FontAwesomeIcon icon="{faChartSimple}" />
        </span>
        <span class="ml-2">Trình độ yêu cầu:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorTypeList.find((e) => e.id == classDetail.tutorType).name }}
        </span>
      </div>
      <div class="icon-text mb-1">
        <span class="icon">
          <FontAwesomeIcon icon="{faLocationDot}" />
        </span>
        <span class="ml-2">Địa chỉ:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.addressDetail }}, {{ classDetail.addressProvince }}
        </span>
      </div>
      <div class="icon-text mb-1">
        <span class="icon">
          <FontAwesomeIcon icon="{faLocationDot}" />
        </span>
        <span class="ml-2">Số điện thoại:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.registerPhone }}
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
  </div>
</template>

<script>
import classApi from "../../services/classApi";

import commonConst from "../../constants/commonConst";

export default {
  name: "ClassDetail",
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      classDetail: null,
      tutorTypeList: commonConst.TUTOR_TYPE_LIST,
      statusList: commonConst.CLASS_STATUS_LIST,
    };
  },
  created() {
    if (this.$route.query.classId) {
      this.getClassDetail(this.$route.query.classId);
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
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    },
  },
};
</script>
