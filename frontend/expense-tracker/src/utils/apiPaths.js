export const API_BASE_URL = 'http://localhost:8000';

//utils/apiPaths.js
export const API_PATHS = {
  AUTH :{
    LOGIN:"/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getuser",

  },
  DASHBOARD:{
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME:{
    ADD_INCOME: "/api/v1/income/add",
    GET_INCOME: "/api/v1/income/get",
    DELETE_INCOME:(INCOME_ID)=> `/api/v1/income/${INCOME_ID}`,
    DOWNLOAD_INCOME: "/api/v1/income/download",
  },
  EXPENSE:{
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE:(EXPENSE_ID)=> `/api/v1/expense/${EXPENSE_ID}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/download",
  },
  IMAGE:{
    UPLOAD_IMAGE: "/api/v1/auth/upload-img",
  }

};