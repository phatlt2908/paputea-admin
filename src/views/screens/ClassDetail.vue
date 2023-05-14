<template>
  <div id="classDetail" class="section">
    <div v-if="classDetail">
      <h1>Thông tin đăng ký tìm kiếm gia sư</h1>
      <h2>Mã số: {{ classDetail.classCode }}</h2>
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
        <a
          v-if="classDetail.status == 10"
          class="ml-4"
          @click="handleClassApproval"
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
          {{ classDetail.addressDetail }}, {{ classDetail.addressDistrict }}, {{ classDetail.addressProvince }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Ngày bắt đầu học:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ formatDate(classDetail.openingDay) }}
        </span>
      </div>
      <div class="mb-1">
        <span class="ml-2">Yêu cầu:</span>
        <span class="ml-2 has-text-weight-bold">
          {{ classDetail.note }}
        </span>
      </div>
    </div>
    <div v-else>Loading...</div>
    <div class="mt-5">
      <h2>Gia sư đang đứng lớp:</h2>
      <div v-if="tutorApprovedInfo">
        <router-link
          :to="{
            name: 'tutorDetail',
            query: { tutorId: tutorApprovedInfo.tutorId },
          }"
        >
          {{
            `${tutorApprovedInfo.tutorName} - ${tutorApprovedInfo.tutorPhone}`
          }}
        </router-link>
        <span class="ml-5"><a @click="handleUndoApproveRequested">Hủy bàn giao</a></span>
      </div>
      <div v-else>[Chưa bàn giao]</div>
    </div>
    <h2>Danh sách gia sư yêu cầu đứng lớp</h2>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Mã số</th>
          <th>Tên</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Thời gian rảnh</th>
          <th>Gia sư đã được duyệt?</th>
          <th>Ngày yêu cầu</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tutorRequestedList" :key="index">
          <td>
            <router-link
              :to="{ name: 'tutorDetail', query: { tutorId: item.tutorId } }"
            >
              {{ item.tutorCode }}
            </router-link>
          </td>
          <td>{{ item.tutorName }}</td>
          <td>{{ item.tutorPhone }}</td>
          <td>{{ item.province }}</td>
          <td>
            {{ item.freeTimes }}
          </td>
          <td>
            {{ item.isTutorApproved ? "Đã phê duyệt" : "Chưa phê duyệt" }}
          </td>
          <td>{{ formatDate(item.requestDate) }}</td>
          <td>
            {{ item.isRequestApproved ? "Đã bàn giao" : "Chưa bàn giao" }}
          </td>
          <td>
            <div v-if="classDetail.status == 20">
              <a
                v-if="item.isRequestApproved"
                class="icon-text button is-ghost"
                disabled
              >
                <span class="icon">
                  <font-awesome-icon icon="person-circle-check" />
                </span>
                <span>Bàn giao</span>
              </a>
              <a
                v-else
                class="icon-text button is-ghost"
                @click="handleApproveRequested(item)"
              >
                <span class="icon">
                  <font-awesome-icon icon="person-circle-check" />
                </span>
                <span>Bàn giao</span>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import classApi from "../../services/classApi";

import commonConst from "../../constants/commonConst";
import { formatCurrency } from "../../utils/stringUtil";

export default {
  name: "ClassDetail",
  data() {
    return {
      keywordSearch: "",
      statusSelecteds: [],
      classDetail: null,
      tutorApprovedInfo: null,
      tutorRequestedList: [],
      tutorTypeList: commonConst.TUTOR_TYPE_LIST,
      classStatusList: commonConst.CLASS_STATUS_LIST,
    };
  },
  created() {
    if (this.$route.query.classId) {
      this.getClassDetail(this.$route.query.classId);
      this.getTutorApproved(this.$route.query.classId);
      this.getTutorRequested(this.$route.query.classId);
    }
  },
  methods: {
    initData() {
      if (this.$route.query.classId) {
        this.getClassDetail(this.$route.query.classId);
        this.getTutorApproved(this.$route.query.classId);
        this.getTutorRequested(this.$route.query.classId);
      }
    },
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
    getTutorRequested(classId) {
      classApi
        .getTutorRequested(classId)
        .then((res) => {
          this.tutorRequestedList = res.data;
        })
        .catch((err) => {
          console.error("Load class tutor approved failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được thông tin gia sư yêu cầu :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    handleClassApproval() {
      this.$swal({
        icon: "question",
        title: "Xác nhận",
        text: "Bạn muốn phê duyệt lớp này phải không?",
        showConfirmButton: true,
        showCancelButton: true,
        type: "question",
      }).then((result) => {
        if (result.isConfirmed) {
          classApi
            .approveClass(this.classDetail.id)
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
              console.error("Approve class failed ", err);
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
    handleApproveRequested(tutorRequested) {
      this.$swal({
        icon: "question",
        title: "Xác nhận",
        text:
          "Bạn muốn bàn giao lớp này cho gia sư [" +
          tutorRequested.tutorName +
          "] phải không?",
        showConfirmButton: true,
        showCancelButton: true,
        type: "question",
      }).then((result) => {
        if (result.isConfirmed) {
          classApi
            .approveRequestedClass(this.classDetail.id, tutorRequested.tutorId)
            .then(() => {
              this.initData();
              this.$swal({
                icon: "success",
                title: "Đã bàn giao thành công",
                timer: 3000,
                showConfirmButton: true,
              });
            })
            .catch((err) => {
              console.error("Approve requested class failed ", err);
              this.$swal({
                icon: "error",
                title: "Bàn giao thất bại :(",
                timer: 3000,
                showConfirmButton: true,
                type: "error",
              });
            });
        }
      });
    },
    handleUndoApproveRequested() {
      this.$swal({
        icon: "question",
        title: "Xác nhận",
        text:
          "Bạn muốn hủy bàn giao lớp này?",
        showConfirmButton: true,
        showCancelButton: true,
        type: "question",
      }).then((result) => {
        if (result.isConfirmed) {
          classApi
            .undoApproveRequestedClass(this.classDetail.id)
            .then(() => {
              this.initData();
              this.$swal({
                icon: "success",
                title: "Đã hủy bàn giao",
                timer: 3000,
                showConfirmButton: true,
              });
            })
            .catch((err) => {
              console.error("Undo approve requested class failed ", err);
              this.$swal({
                icon: "error",
                title: "Hủy bàn giao thất bại :(",
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
