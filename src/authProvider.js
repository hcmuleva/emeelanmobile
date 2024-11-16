import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const USER_ROLE = import.meta.env.VITE_USERROLE;
const USER_STATUS = import.meta.env.VITE_USERSTATUS;
export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");
import moment from "moment";

const makeMeelanRequest = async (
  values,
  token,
  id
) => {
  const timeFormat = "HH:mm:ss.SSS";
  const { manglik, have_child, birth_time } = values;
  const isManglik = manglik === "YES" ? true : false;
  const isHaveChild = have_child === "YES" ? true : false;
  let formatedTime = null;
  if (birth_time) {
    const momentObject = moment(birth_time?.$d, timeFormat);
    formatedTime = momentObject.format(timeFormat);
  }
  const { mother_photo, father_photo, self_image } = values;

  const formData = new FormData();

  const motherPhotoFile = mother_photo?.file;
  const fatherPhotoFile = father_photo?.file;
  const selfPhotoFile = self_image?.file;

  if (motherPhotoFile) {
    formData.append("files", motherPhotoFile);
  }
  if (fatherPhotoFile) {
    formData.append("files", fatherPhotoFile);
  }
  if (selfPhotoFile) {
    formData.append("files", selfPhotoFile);
  }

  let responsedata = [];

  let mother_photo_id = null;
  let father_photo_id = null;
  let photos = null;

  if (motherPhotoFile || fatherPhotoFile || selfPhotoFile) {
    const response_upload = await axios.post(
      API_URL + "/api/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    responsedata = response_upload?.data;
    responsedata?.map((imagefileresponse, index) => {
      if (index === 0) {
        mother_photo_id = imagefileresponse?.id;
      }
      if (index === 1) {
        father_photo_id = imagefileresponse?.id;
      }
      if (index === 2) {
        photos = imagefileresponse?.id;
      }
    });
  }
  const usermeelandata = {
    ...values,
    manglik: isManglik,
    self_image: null,
    have_child: isHaveChild,
    birth_time: formatedTime,
    mother_photo: mother_photo_id,
    father_photo: father_photo_id,
    photos: photos,
    age: values?.age ? String(values?.age) : "",
    user: id,
  };

  const usermeelanresponse = await axios.post(
    API_URL + `/api/usermeelans`,
    { data: { ...usermeelandata } },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  if (usermeelanresponse.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const authProvider = {
  login: async ({
    userid,
    password,
  }) => {
    try {
      const { data, status } = await strapiAuthHelper.login(userid, password);
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);
        localStorage.setItem("userid", String(data?.user?.id));
        localStorage.setItem("emeelanrole", String(data?.user?.emeelanrole));
        if (axiosInstance) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.jwt}`;
        }
        const role = data?.user?.emeelanrole;
        console.log("role",role)
    switch (role) {
      
      case "MEELAN":
        return { success: true, redirectTo: "/user-dashboard" };

      case "CENTER":
        return { success: true, redirectTo: "/dashboard" };

      case "ADMIN":
        return { success: true, redirectTo: "/admin-dashboard" };

      default:
        return { success: true, redirectTo: "/" }; // Default fallback
    }
      }
    } catch (error) {
      const errorObj = error?.response?.data?.message?.[0]?.messages?.[0];
      return {
        success: false,
        error: {
          message: errorObj?.message || "Login failed",
          id: errorObj?.id || "Invalid userid or password",
          statusCode: 403,
        },
      };
    }
    return {
      success: false,
      error: {
        message: "Login failed",
        id: "Invalid userid or password",
        statusCode: 403,
      },
    };
  },
  register: async (values) => {
    let email = values.email;
    let username = values.username;
    let password = values.password;

    let commvalues = {
      mobile: values?.MobileNumber,
      firstname: values?.FirstName,
      lastname: values?.LastName,
      gotra: values?.Gotra,
      mother: values?.MotherName,
      father: values?.FatherName,
      dob: values?.DOB,
      marital: values?.MeritalStatus,
      sex: values?.Sex,
      occupation: values?.Profession,
    };

    if (!email) {
      if (values.mobile) {
        email = `${values.mobile}@hph.com`;
      }
      if (values.username) {
        email = `${values.username}@hph.com`;
      }
    }

    if (!username && email) {
      username = email.match(/^([^@]*)@/)[1];
    }
    if (!password) {
      password = "welcome";
    }

    try {
      const response = await axiosInstance.post(
        API_URL + "/api/auth/local/register",
        {
          username: username,
          password: password,
          email: email,
          emeelanrole: "MEELAN",
          userstatus: "PENDING",
          ...commvalues,
        }
      );

      const { status, data } = response;
      if (status === 200) {
        const can_go_to_dashboard = await makeMeelanRequest(
          values,
          data?.jwt,
          data?.user?.id
        );
        if (can_go_to_dashboard) {
          localStorage.setItem(TOKEN_KEY, data?.jwt);
          if (axiosInstance) {
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data?.jwt}`;
          }
          return {
            success: true,
            redirectTo: "/",
          };
        }
      }
    } catch (error) {
      const errorObj = error?.response?.data?.message?.[0]?.messages?.[0];
      return {
        success: false,
        error: {
          message: errorObj?.message || "Register failed",
          id: errorObj?.id || "Invalid email or password",
          statusCode: 403,
        },
      };
    }
    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    localStorage.clear();
    window.location.reload();
    return {
      success: true,
    };
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }
    return { error };
  },

  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (axiosInstance) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      error: {
        message: "Authentication failed",
        id: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        return null;
    }

    const { data, status } = await strapiAuthHelper.me(token, {
        meta: {
            populate: {
                usermeelan: { populate: { photos: { fields: ["id"] } } },
                likesto: {
                    populate: {
                        usersto: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
                likesby: {
                    populate: {
                        usersfrom: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
                requeststo: {
                    populate: {
                        requeststo: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
                requestby: {
                    populate: {
                        requestsfrom: {
                            populate: {
                                usermeelan: {
                                    populate: { photos: { fields: ["id", "url"] } },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (status === 200) {
        const {
            id,
            username,
            email,
            userstatus,
            emeelanrole,
            likesby,
            likesto,
            requeststo,
            requestsby,
            usermeelan,
        } = data;
        localStorage.setItem(USER_ROLE, emeelanrole);
        localStorage.setItem(USER_STATUS, userstatus);
        return {
            userstatus,
            emeelanrole,
            id,
            username,
            email,
            usermeelan,
            likesby,
            likesto,
            requeststo,
            requestsby,
        };
    }
    return null;
},

};
