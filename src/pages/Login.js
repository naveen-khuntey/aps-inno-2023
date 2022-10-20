import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserData } from "../store/slices/user.slice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, auth } from "../firebase";
import DBfunctions from "../utils/db";
import { collection } from "firebase/firestore";

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

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

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
    if (!isSignup) {
      setIsLoggingIn(true);
      signIn();
    } else {
      setIsRegistering(true);
      //BASIC VALIDATION

      if (password !== confirmPassword) {
        setIsRegistering(false);
        alert("Passwords do not match. Try again!");
        setConfirmPassword("");
        return;
      }

      let regexp = /^[6789]\d{9}$/;
      if (!phone.match(regexp)) {
        setIsRegistering(false);
        alert("Invalid phone number!");
        return;
      }
      //check for availability of the username
      checkAvailability();
    }
  };

  return (
    <div className="font-mono bg-purple-50 min-h-screen ">
      <h1 className="bg-purple-500 text-white p-4 text-2xl text-center uppercase">
        {isSignup ? "SIGN UP" : "LOG IN"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center mt-60">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email..."
            className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password here..."
            className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
          />
          {isSignup && (
            <>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter password again"
                className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number without +91 "
                className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="py-2 px-4 outline-none rounded shadow w-64 mb-6"
              />
            </>
          )}
          {isSignup ? (
            <>
              <Button addClassNames="mb-6">
                {isRegistering ? "Signing up" : "Signup"}
              </Button>
              <p
                style={{ color: "#999", fontSize: "15px", cursor: "pointer" }}
                onClick={() => toggleAuth()}
                className="mb-10"
              >
                Already have an account?
              </p>
            </>
          ) : (
            <>
              <Button addClassNames="mb-6">
                {isLoggingIn ? "Logging in" : "Login"}
              </Button>
              <p
                style={{ color: "#999", fontSize: "15px", cursor: "pointer" }}
                onClick={() => toggleAuth()}
              >
                Don't have an account?
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
