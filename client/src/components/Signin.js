import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin, signinWithGoogle } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { darkTheme } from "../mui/themes";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { useGoogleLogin } from "react-google-login";
import { Paper } from "@mui/material";
import { darkTheme } from "../mui/themes";

export default function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const navigate = useNavigate();
  const redirect = userInfo ? "/feeds" : "/";

  // const { signIn, loaded } = useGoogleLogin({
  //   onSuccess,
  //   clientId,
  //   isSignedIn,
  //   onFailure,
  // });

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    var id_token = response.getAuthResponse().id_token;
    console.log(id_token);
    dispatch(signinWithGoogle(id_token));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs" sx={{ color: "Black" }}>
        <CssBaseline />
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Paper
        sx={{
          marginTop: 8,
          bgcolor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
          border: "solid 1px #6c757d"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="flex-end" sx={{mt:2}}>
            <Grid item container xs={12} justifyContent="center">
              <GoogleLogin
                clientId="541968906767-0v6pfapcciop5ifcqqo5gbu8dmfqkctf.apps.googleusercontent.com"
                buttonText="Sign In With Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                // isSignedIn={true}
              />
            </Grid>
            {/* <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item container justifyContent="center" sx={{mt:3}}>
              <Link to="/register" className="link">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
    </ThemeProvider>
  );
}

// Once google credentials are input they should land on feeds page like normal login
// To make that work mimic the in dispatch flow but use on success google hook
// If there is a failure take care of that.
// Console log the response to understand what to do
