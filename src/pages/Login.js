import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserData } from "../store/slices/user.slice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import { db, auth } from "../firebase";
import DBfunctions from "../utils/db";
import { collection } from "firebase/firestore";
import img from "./images/GameOver.png";
import "./Login.css";
import * as Components from "./Components";
// import { FrameWrapper } from "../components/logreg/FrameWrapper";
// import { SignUpWrapper } from "../components/logreg/SignUpWrapper";
import bg_img from "./images/LoginBG12.png";
function Login({ isAuth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersCollectionRef = collection(db, "users");
  const { getSingleUser, createUser, isUniqueUsername } = DBfunctions;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [InstituteName, setInstituteName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatchData = async (userdata) => {
    await dispatch(
      storeUserData({
        id: userdata.id,
        username: userdata.username,
        email: userdata.email,
        phone: userdata.phone,
      })
    );
  };

  const toggleAuth = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setUsername("");
    setIsSignup((prev) => !prev);
  };

  const getIndividualUser = async (id) => {
    try {
      const user = await getSingleUser({
        collectionRef: usersCollectionRef,
        id,
      });
      dispatchData({
        id,
        email: user.email,
        phone: user.phone,
        username: user.username,
      });
      setIsLoggingIn(false);
      navigate(
        "/753778214125442A462D4A614E645267556B58703273357638792F423F4528482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367556B58703273357638792F423F4528482B4D6251655468576D597133743677397A24432646294A404E635266556A586E327234753778214125442A472D4B6150645367566B59703373367638792F423F4528482B4D6251655468576D5A7134743777217A24432646294A404E635266556A586E3272357538782F413F442A472D4B6150645367566B59703373367639792442264529482B4D6251655468576D5A7134743777217A25432A462D4A"
      );
    } catch (e) {
      setIsLoggingIn(false);
      alert("Error" + e.message);
    }
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        getIndividualUser(uid);
      })
      .catch((error) => {
        setIsLoggingIn(false);
        alert(error.message);
      });
  };

  const postUserData = async (uid) => {
    try {
      await createUser({
        collectionRef: usersCollectionRef,
        data: { id: uid, email, phone, username },
      });
      setIsRegistering(false);
      navigate(
        "/753778214125442A462D4A614E645267556B58703273357638792F423F4528482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367556B58703273357638792F423F4528482B4D6251655468576D597133743677397A24432646294A404E635266556A586E327234753778214125442A472D4B6150645367566B59703373367638792F423F4528482B4D6251655468576D5A7134743777217A24432646294A404E635266556A586E3272357538782F413F442A472D4B6150645367566B59703373367639792442264529482B4D6251655468576D5A7134743777217A25432A462D4A"
      );
    } catch (e) {
      setIsRegistering(false);
      alert("Error" + e.message);
    }
  };

  const register = () => {
    if (ValidateEmail(email)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatchData({
            id: userCredential.user.uid,
            email,
            username,
            phone,
          });
          postUserData(userCredential.user.uid);
        })
        .catch((error) => {
          setIsRegistering(false);
          alert(error.message);
        });
    }
  };

  const checkAvailability = async () => {
    try {
      const isUnique = await isUniqueUsername({
        collectionRef: usersCollectionRef,
        username,
      });
      if (!isUnique) {
        setIsRegistering(false);
        alert("Username already in use!");
      } else {
        register();
      }
    } catch (e) {
      setIsRegistering(false);
      alert("Error" + e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      setIsLoggingIn(true);
      signIn();
    } else {
      setIsRegistering(true);
      //BASIC VALIDATION

      if (!isSignup && password !== confirmPassword) {
        setIsRegistering(false);
        alert("Passwords do not match. Try again!");
        setConfirmPassword("");
        return;
      }

      let regexp = /^[6789]\d{9}$/;
      if (!isSignup && !phone.match(regexp)) {
        setIsRegistering(false);
        alert("Invalid phone number!");
        return;
      }
      //check for availability of the username
      checkAvailability();
    }
  };

  function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      if (
        inputText.endsWith("gmail.com") ||
        inputText.endsWith("nitrkl.ac.in") ||
        inputText.endsWith("hotmail.com") ||
        inputText.endsWith("outlook.com") ||
        inputText.endsWith("yahoo.com")
      ) {
        return true;
      } else {
        console.log("check");
        alert("Please check your Email ID.");
        return false;
      }
    } else {
      alert("You have entered an invalid email address");
      return false;
    }
  }

  //const [isSignIn, toggle] = useState(true);
  return (
    <div className="logreg">
      {/* <div className="bg-image"></div> */}
      <Components.Container>
        <Components.SignUpContainer signingIn={isSignup}>
          <Components.Form autocomplete="off" onSubmit={handleSubmit}>
            <h1 id="head_login">Create Account</h1>

            <Components.Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <Components.Input
              onChange={(e) => setInstituteName(e.target.value)}
              type="text"
              placeholder="Institute Name"
            />
            <Components.Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <Components.Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Components.Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            <Components.Input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone Number"
            />
            {/* <button class=" w-36 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 mx-4 overflow-hidden text-lg font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover: bg-slate-200 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-cyan-800">
              <span class=" w-36 relative px-5 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-white hover:text-black">
                LOGIN
              </span>
            </button> */}
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={isSignup}>
          <Components.Form autocomplete="off" onSubmit={handleSubmit}>
            <h1 id="head_login">Sign in</h1>
            <Components.Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              autocomplete="off"
            />
            <Components.Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autocomplete="off"
            />
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={isSignup}>
          <Components.Overlay signingIn={isSignup}>
            <Components.LeftOverlayPanel
              className="login_bg"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg_img})`,
                backdropFilter: "blur(10px)",
                backgroundPosition: "0px ",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              signingIn={isSignup}
            >
              <h1 id="head_login">Welcome Back!</h1>
              <p>
                To keep connected with us please login with your credentials
              </p>
              <Components.GhostButton
                onClick={() => {
                  setIsSignup(true);
                  setPassword("");
                  setEmail("");
                }}
              >
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel
              className="login_bg"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg_img})`,
                backdropFilter: "blur(10px)",
                backgroundPosition: "0px ",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(${bg_img})`,
              }}
              signingIn={isSignup}
            >
              <h1 id="head_login">Hey there!</h1>
              <p>If you don't have account, create here.</p>
              <Components.GhostButton
                onClick={() => {
                  setIsSignup(false);
                  setPassword("");
                  setEmail("");
                }}
              >
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Login;
