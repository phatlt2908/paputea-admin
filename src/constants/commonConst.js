const commonConst = {
  WEAK_PASSWORD: [
    "123456",
    "654321",
    "password",
    "qwerty",
    "123123",
    "iloveyou",
  ],
  REQUIRE_LOGGED_SCREEN: [],
  TUTOR_TYPE_LIST: [
    {
      id: 0,
      name: "Không yêu cầu",
    },
    {
      id: 1,
      name: "Sinh viên",
    },
    {
      id: 2,
      name: "Giáo viên",
    },
  ],
  CLASS_STATUS_LIST: [
    {
      id: 10,
      name: "Chưa phê duyệt",
      color: "has-text-danger",
    },
    {
      id: 20,
      name: "Đã phê duyệt",
      color: "has-text-warning",
    },
    {
      id: 30,
      name: "Đã bàn giao",
      color: "has-text-success",
    },
  ],
};

export default commonConst;
