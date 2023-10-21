import React from "react";
import { useNavigate } from "react-router-dom";
import APSLogo from "./images/aps-logo2.png";
import RobotImg from "./images/robot-image.png";
import InnoImg from "./images/Inno.png";
import "./Styles.css";

const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(
      "/login753778214125442A462D4A614E645267556B58703273357638792F423F4528482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367556B58703273357638792F423F4528482B4D6251655468576D597133743677397A24432646294A404E635266556A586E327234753778214125442A472D4B6150645367566B59703373367638792F423F4528482B4D6251655468576D5A7134743777217A24432646294A404E635266556A586E3272357538782F413F442A472D4B6150645367566B59703373367639792442264529482B4D6251655468576D5A7134743777217A25432A462D4A"
    );
  };

  return (
    <section id="home" style={{ backgroundColor: "black" }}>
      <div className="flex flex-col min-h-full px-16 content-top">
        <div className=" flex h-min justify-left content-center py-4 pt-8 gap-8">
          <img src={APSLogo} alt="APS Logo" style={{ maxWidth: 75 }} />
          <img src={InnoImg} alt="Inno Logo" style={{ maxWidth: 75 }} />
        </div>
        <div className="flex h-full justify-evenly content-center">
          <div className="grid h-full content-center text-white text-lef">
            <h1 class="mb-4 text-9xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              ROBO <br /> RUNNER
            </h1>
            <p class="mb-6 text-2xl font-normal text-white-500 dark:text-gray-300 text-left">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
            <div className="flex justify-start py-8">
              <button
                type="button"
                class="text-black w-36 bg-white transition-all ease-in duration-100 hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-slate-400 font-medium rounded-full text-lg px-5 py-4 text-center mr-2 mb-2"
                onClick={onClick}
              >
                REGISTER
              </button>
              <button
                class=" w-36 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 mx-4 overflow-hidden text-lg font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover: bg-slate-200 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-cyan-800"
                onClick={onClick}
              >
                <span class=" w-36 relative px-5 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-white hover:text-black">
                  LOGIN
                </span>
              </button>
            </div>
          </div>
          <div className="grid h-min content-center">
            <img
              id="floating-img"
              src={RobotImg}
              alt="APS LOGO"
              style={{ minWidth: 500, marginBottom: 100 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;