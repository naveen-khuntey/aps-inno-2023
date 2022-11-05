import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserData } from "../store/slices/user.slice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser 
} from "firebase/auth";
import { db, auth } from "../firebase";
import DBfunctions from "../utils/db";
import { collection } from "firebase/firestore";
import img from "./images/GameOver.png";

import * as Components from "./Components";

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
      navigate("/");
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
      navigate("/");
    } catch (e) {
      setIsRegistering(false);
      alert("Error" + e.message);
    }
  };

  const register = () => {
    if(ValidateEmail(email))
    {
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


function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
  if((inputText.endsWith("gmail.com"))||(inputText.endsWith("nitrkl.ac.in"))||(inputText.endsWith("hotmail.com"))||(inputText.endsWith("outlook.com"))||(inputText.endsWith("yahoo.com")))
  {
    return true;
  }
  else
  {
    console.log("check")
      alert("Please check your Email ID.");
      return false;
    }
  }
else
{
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
        <Components.Form  autocomplete="off" onSubmit={handleSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
          <Components.Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <Components.Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <Components.Input onChange={(e) => setConfirmPassword(e.target.value)} type="text" placeholder="Confirm Password" />
          <Components.Input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone Number" />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
   
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={isSignup}>
        <Components.Form  autocomplete="off" onSubmit={handleSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" autocomplete="off"/>
          <Components.Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autocomplete="off" />
          <Components.Button  >Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={isSignup}>
       
        <Components.Overlay signingIn={isSignup}>
          <Components.LeftOverlayPanel signingIn={isSignup}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your credentials
            </Components.Paragraph>
            <Components.GhostButton onClick={() => {
              setIsSignup(true)
              setPassword("")
              setEmail("")
              }}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={isSignup}>
            <Components.Title>Hey there!</Components.Title>
            <Components.Paragraph>
              If you don't have account, create here.
            </Components.Paragraph>
            <Components.GhostButton onClick={() =>{
              setIsSignup(false)
              setPassword("")
              setEmail("")
            }}>
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
