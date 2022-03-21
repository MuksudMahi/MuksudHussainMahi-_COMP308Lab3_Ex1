import axios from "axios";

// const auth = async () => {
//   //console.log("calling auth");
//   axios({
//     method: "GET",
//     withCredentials: true,
//     url: "http://localhost:3500/student",
//   }).then((res) => {
//     console.log(res.data.studentNumber);
//     sessionStorage.setItem("isLoggedIn", JSON.stringify(res.data));
//   });
// };

const auth = {
  login(data) {
    sessionStorage.setItem("auth", data);
  },

  logout() {
    sessionStorage.clear();
  },

  isAuthenticated() {
    let data = sessionStorage.getItem("auth");
    if (data) return true;
    else return false;
  },
};

export default auth;
