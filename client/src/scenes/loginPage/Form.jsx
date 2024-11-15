import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// Validation schemas
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  email: yup
    .string()
    .email("Invalid email format.")
    .matches(/^[^@\s]+@[^@\s]+\.(com|org)$/, "Email must end with .com or .org.")
    .required("Please enter your email."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Please enter your password."),
  picture: yup.string().required("Please upload a picture."),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format.")
    .matches(/^[^@\s]+@[^@\s]+\.(com|org)$/, "Email must end with .com or .org.")
    .required("Please enter your email."),
  password: yup.string().required("Please enter your password."),
});


const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const register = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (values.picture) {
        formData.append("picture", values.picture);
        formData.append("picturePath", values.picture.name);
      }

      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      onSubmitProps.resetForm();
      setPageType("login");
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      setLoading(true);
      const { data: loggedIn } = await axios.post(
        "http://localhost:3001/auth/login",
        values
      );
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        navigate("/home");
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <ToastContainer
        position="top-center" // Center the toast
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="dark" // Set dark theme
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    autoComplete="off"
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "white", // Default color for label
                        "&.Mui-focused": {
                          color: "orange", // Color when focused
                        },
                        "&.MuiFormLabel-filled": {
                          color: "orange", // Color when filled
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "orange",
                        },
                        "&:hover fieldset": {
                          borderColor: "orange",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    autoComplete="off"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "white", // Default color for label
                        "&.Mui-focused": {
                          color: "orange", // Color when focused
                        },
                        "&.MuiFormLabel-filled": {
                          color: "orange", // Color when filled
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "orange",
                        },
                        "&:hover fieldset": {
                          borderColor: "orange",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "orange",
                        },
                      },
                    }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${theme.palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${theme.palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Typography>Add Picture Here</Typography>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                autoComplete="off"
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": {
                    color: "white", // Default color for label
                    "&.Mui-focused": {
                      color: "orange", // Color when focused
                    },
                    "&.MuiFormLabel-filled": {
                      color: "orange", // Color when filled
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "orange",
                    },
                    "&:hover fieldset": {
                      borderColor: "orange",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange",
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                autoComplete="new-password"
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": {
                    color: "white", // Default color for label
                    "&.Mui-focused": {
                      color: "orange", // Color when focused
                    },
                    "&.MuiFormLabel-filled": {
                      color: "orange", // Color when filled
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "orange",
                    },
                    "&:hover fieldset": {
                      borderColor: "orange",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                        sx={{ color: "orange" }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "orange" }} />
                        ) : (
                          <Visibility sx={{ color: "orange" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Button
                fullWidth
                type="submit"
                disabled={
                  loading ||
                  (!isLogin
                    ? !values.firstName ||
                      !values.lastName ||
                      !values.email ||
                      !values.password ||
                      !values.picture ||
                      Boolean(errors.firstName) ||
                      Boolean(errors.lastName) ||
                      Boolean(errors.email) ||
                      Boolean(errors.password)
                    : !values.email ||
                      !values.password ||
                      Boolean(errors.email) ||
                      Boolean(errors.password))
                }
                sx={{
                  mt: "2rem",
                  p: ".8rem",
                  backgroundColor: "#1f51b9", // Blue button color
                  color: "#ffffff",
                  fontSize: "1.025rem",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease-in-out",
                  "&:hover": { backgroundColor: "#103f8f" }, // Dark blue on hover
                  borderRadius: "10px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                }}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : isLogin ? (
                  "LOGIN"
                ) : (
                  "REGISTER"
                )}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  mt: "1rem",
                  color: "grey",
                  "&:hover": { cursor: "pointer" },
                  fontSize: "0.725rem",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span
                      style={{
                        color: "orange",
                        textDecoration: "underline",
                      }}
                    >
                      Register Here
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <span
                      style={{
                        color: "orange",
                        textDecoration: "underline",
                      }}
                    >
                      Login
                    </span>
                  </>
                )}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
