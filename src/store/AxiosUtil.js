import axios from 'axios'
const axiosService=axios.create({

});
axiosService.interceptors.response.use(response=>{
  alert(response);
  return response;
},error => {
  return error;
});
export default axiosService
