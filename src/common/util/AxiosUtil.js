import axios from 'axios'

axios.interceptors.response.use(response=>{
  let code=response.data.code;
  if(code===401) {
    location.replace('/login');
    return response;
  }
  if(code===200){
    return response;
  }
  return response;
},error => {
    return error;
});
export default axios;
