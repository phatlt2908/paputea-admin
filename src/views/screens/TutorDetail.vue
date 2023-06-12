<template>
  <div id="tutorDetail" class="section">
    <div v-if="tutorDetail">
      <h1>Thông tin gia sư</h1>
      <h2>Tên: {{ tutorDetail.name }}</h2>
      <div class="is-size-7 mb-4">
        Ngày đăng ký: {{ formatDate(tutorDetail.registrationDate) }}
      </div>
      <div class="mb-1">
        <span class="ml-2">Trạng thái:</span>
        <span
          class="ml-2 has-text-weight-bold"
          :class="
            tutorDetail.isApproved ? 'has-text-success' : 'has-text-warning'
          "
        >
          {{ tutorDetail.isApproved ? "Đã phê duyệt" : "Chưa phê duyệt" }}
        </span>
        <a
          v-if="!tutorDetail.isApproved"
          class="ml-4"
          @click="handleTutorApproval"
          >Phê duyệt</a
        >
        <span
          class="ml-2"
          title="Phê duyệt để hiển thị tại trang 'Lớp mới chưa giao'"
        >
          <font-awesome-icon icon="circle-info" />
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Số điện thoại:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.phone }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Email:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.email }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Giới tính:</span>
        <span class="ml-2 has-text-weight-bold">
          {{
            tutorDetail.gender == 1
              ? "Nam"
              : tutorDetail.gender == 2
              ? "Nữ"
              : "Khác"
          }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Ngày sinh:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ formatDate(tutorDetail.birthday) }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Công việc:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.job }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Môn dạy:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.major }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Địa chỉ làm việc:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.workplaceDetail }},
          {{ tutorDetail.workplaceDistrict }},
          {{ tutorDetail.workplaceProvince }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Sinh viên / giáo viên trường:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.school }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Năm tốt nghiệp:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ formatDate(tutorDetail.graduationYear) }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Xếp loại tốt nghiệp:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.graduationGrade }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Địa chỉ mong muốn dạy:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.teachingAreaDetail }},
          {{ tutorDetail.teachingAreaDistrict }},
          {{ tutorDetail.teachingAreaProvince }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Học phí mong muốn:</span>
        <span class="ml-2 has-text-weight-bold">
          {{
            tutorDetail.desiredTuition && tutorDetail.desiredTuition > 0
              ? formatCurrency(tutorDetail.desiredTuition)
              : "? ₫"
          }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Thời gian rảnh:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.freeTimes }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Ưu điểm:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.advantage }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Ghi chú:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ tutorDetail.note }}
        </span>
      </div>
    </div>
    <div v-else>Loading...</div>

    <h2 class="mt-5">Danh sách lớp đang ứng tuyển:</h2>
    <tutor-class-list v-if="tutorDetail" :isApproved="false" :tutorId="tutorDetail.id" />

    <h2 class="mt-5">Danh sách lớp đã dạy:</h2>
    <tutor-class-list v-if="tutorDetail" :isApproved="true" :tutorId="tutorDetail.id" />
  </div>
</template>

<script>
import tutorApi from "../../services/tutorApi";
import { formatCurrency } from "../../utils/stringUtil";
import TutorClassList from "../components/TutorClassList.vue";

export default {
  name: "TutorDetail",
  components: { TutorClassList },
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      tutorDetail: null,
      tutorApprovedInfo: null,
    };
  },
  created() {
    if (this.$route.query.tutorId) {
      this.getTutorDetail(this.$route.query.tutorId);
    }
  },
  methods: {
    initData() {
      if (this.$route.query.tutorId) {
        this.getTutorDetail(this.$route.query.tutorId);
      }
    },
    getTutorDetail(classId) {
      tutorApi
        .getTutorDetail(classId)
        .then((res) => {
          this.tutorDetail = res.data;
        })
        .catch((err) => {
          console.error("Load tutor detail failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được thông tin gia sư :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    handleTutorApproval() {
      this.$swal({
        icon: "question",
        title: "Xác nhận",
        text: "Bạn muốn phê duyệt gia sư này phải không?",
        showConfirmButton: true,
        showCancelButton: true,
        type: "question",
      }).then((result) => {
        if (result.isConfirmed) {
          tutorApi
            .approveTutor(this.tutorDetail.id)
            .then(() => {
              this.initData();
              this.$swal({
                icon: "success",
                title: "Đã phê duyệt thành công",
                timer: 3000,
                showConfirmButton: true,
              });
            })
            .catch((err) => {
              console.error("Approve tutor failed ", err);
              this.$swal({
                icon: "error",
                title: "Phê duyệt thất bại :(",
                timer: 3000,
                showConfirmButton: true,
                type: "error",
              });
            });
        }
      });
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    },
    formatCurrency(value) {
      return formatCurrency(value);
    },
  },
};
</script>
