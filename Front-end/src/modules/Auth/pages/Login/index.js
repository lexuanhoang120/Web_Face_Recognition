import React, { useEffect, useState } from "react";
import { Container, Grid, TextField, Button } from "@mui/material";
import { createSelector } from "reselect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "@/modules/_assets/images/logo.png";
import { tryLogin, getProfile } from "@/common/actions/auth.action";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  ({ isLoading }, { isLogined }) => ({ isLoading, isLogined })
);

// login schema
const LoginSchema = yup.object().shape({
  username: yup
    .string("Bạn vui lòng nhập tài khoản")
    .required("Bạn vui lòng nhập tài khoản"),
  password: yup
    .string("Bạn vui lòng nhập mật khẩu")
    .required("Bạn vui lòng nhập mật khẩu"),
});

const Login = () => {
  const { isLoading, isLogined } = useSelector(selectData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  /**Start username,password */
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    clearErrors();
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  /**End username,password */
  /**Start handleLogin */
  const handleLogin = async () => {
    const { password, username } = values;
    const isSuccess = await dispatch(tryLogin({ username, password }));
    await dispatch(getProfile());
    console.log(isSuccess);
    if (!isSuccess) {
      setError("username", {
        type: "custom",
        message: "Sai tài khoản hoặc mật khẩu",
      });
      setError("password", {
        type: "custom",
        message: "Sai tài khoản hoặc mật khẩu",
      });
    } else {
      navigate("/facerecognition");
    }
  };

  /**End handleLogin */
  useEffect(() => {
    if (isLoading === false && isLogined) return navigate("/facerecognition");
  }, [isLoading]);

  return (
    <div className="login">
      <Container maxWidth="sm">
        <Grid container spacing={2} className="login-wrap">
          <form
            className="login-form-wrap"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="login-form">
              <img src={logo} alt="logo" />
              <h1 className="login-title">Đăng nhập</h1>
              <h2 className="login-sub">
                Sử dụng tài khoản của bạn để đăng nhập
              </h2>
              <TextField
                autoFocus
                name="username"
                autoComplete="off"
                {...register("username", {
                  onChange: (event) => handleChange(event),
                })}
                placeholder="Tài khoản"
                sx={{
                  width: "100%",
                  marginBottom: "20px",
                  borderRadius: "4.8px",
                  input: {
                    color: "#49454F",
                    height: "33px",
                  },
                  fieldset: {
                    borderWidth: "1px !important",
                  },
                }}
                error={errors.username && true}
                helperText={errors.username && errors.username.message}
              />
              <TextField
                name="password"
                placeholder="Mật khẩu"
                autoComplete="off"
                type="password"
                sx={{
                  width: "100%",
                  borderRadius: "4.8px",
                  input: {
                    color: "#49454F",
                    height: "33px",
                  },
                  fieldset: {
                    borderWidth: "1px !important",
                  },
                }}
                {...register("password", {
                  onChange: (event) => handleChange(event),
                })}
                error={errors.password && true}
                helperText={errors.password && errors.password.message}
              />
              <div className="login-forgotpass">Quên tài khoản?</div>
              <div className="btn">
                <Button variant="contained" className="login-btn" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </div>
          </form>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
