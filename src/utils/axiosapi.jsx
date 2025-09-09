import axios from "axios";

const instance = axios.create({
  baseURL:'https://api.themoviedb.org/3/',
  headers:{
    accept:'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGNmYWI1YmE3NjMxMzVjZGFlMGY0MDVkMjVjZmMzZSIsIm5iZiI6MTc1NjgxNzg1OS40LCJzdWIiOiI2OGI2ZTljMzg3NjYwYzYzNDQxNThhMDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vkJIq5MtT_y8UY_bKVwSvsF44yVqruIWgzfDYN1obOE"
  }
})
export default instance;
