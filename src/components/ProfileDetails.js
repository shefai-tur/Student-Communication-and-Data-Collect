import React from "react";
import Sidebar from "./Sidebar";
import DarkLight from "./DarkLight";
import { useSelector } from "react-redux";
import { getAuth, deleteUser } from "firebase/auth";
import { BiEditAlt } from "react-icons/bi";
import { BsCircleHalf, BsFillCalendarWeekFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcDepartment } from "react-icons/fc";
import { MdOutlineCompost } from "react-icons/md";
import { NavLink } from "react-router-dom";
const ProfileDetails = () => {
  const auth = getAuth();
  let data = useSelector((state) => state.loginUser.value);
  let dark = useSelector((state) => state.darkMode.value);

  return (
    <div>
      <div className={`xl:flex  ${dark ? "bg-white" : "bg-black"}`}>
        <div className={`w-full block xl:hidden xl:w-[14%]`}>
          <Sidebar active="home" />
        </div>
        <div className="w-full hidden xl:w-[14%] xl:block">
          <Sidebar active="setting" />
        </div>
        <div className="xl:w-[84%]  ml-20 w-full px-[20px] xl:px-[0px]">
          <div>
            <h3
              className={`font-poppins text-[20px] font-semibold capitalize mt-[20px] xl:mt-[50px] ${
                dark ? "text-black" : "text-white"
              }`}
            >
              USER PROFIlE
            </h3>
            </div>
           
              <div className="flex items-center p-[25px] ">
                <div className="w-[200px] h-[200px] rounded-[50%] overflow-hidden">
                  <picture>
                    <img src={data.photo} />
                  </picture>
                </div>
                <div className="ml-[10px] flex items-center">
                  <h4
                    //   ${dark ? "text-black" : "text-white" }
                    className={`font-poppins font-bold text-4xl capitalize ${
                      dark ? "text-black" : "text-white"
                    }`}
                  >
                    Shefaitur Rahman
                  </h4>
                </div>
              </div>
          
         <div className="flex">
         <div >
         <h3
              className={`font-poppins text-[20px] font-semibold capitalize mt-[20px] xl:mt-[50px] ${
                dark ? "text-black" : "text-white"
              }`}
            >
              Institiute Information        
               </h3>
              <ul className="flex flex-col px-[25px] xl:px-[50px] py-[20px] gap-y-[15px]">
                <li className="flex gap-x-[15px]">
                  <BiEditAlt className="text-primary text-[32px]" />
                  <h4
                    className={`font-poppins text-[25px] font-normal capitalize ${
                      dark ? "text-black" : "text-white"
                    }`}
                  >
                    <span className="font-semibold">Roll Number:</span> 490049
                  </h4>
                </li>
                <li className="flex gap-x-[15px]">
                  <BsFillCalendarWeekFill className="text-primary text-[32px]" />
                  <h4
                    className={`font-poppins text-[25px] font-normal capitalize ${
                      dark ? "text-black" : "text-white"
                    }`}
                  >
                    <span className="font-semibold">Session:</span> 2019-2020
                  </h4>
                </li>
                <li className="flex gap-x-[15px]">
                  <FcDepartment className="text-primary text-[32px]" />
                  <h4
                    className={`font-poppins text-[25px] font-normal capitalize ${
                      dark ? "text-black" : "text-white"
                    }`}
                  >
                    <span className="font-semibold">Department:</span> Computer
                  </h4>
                </li>
              </ul>
            </div>
          <div>
            <h3
              className={`font-poppins text-[20px] font-semibold capitalize mt-[20px] xl:mt-[50px] ${
                dark ? "text-black" : "text-white"
              }`}
            >
              Job Detais
            </h3>
            <ul className="flex flex-col px-[25px] xl:px-[50px] py-[20px] gap-y-[15px]">
              <li className="flex gap-x-[15px]">
                <MdOutlineCompost className="text-primary text-[32px]" />
                <h4
                  className={`font-poppins text-[25px] font-normal capitalize ${
                    dark ? "text-black" : "text-white"
                  }`}
                >
                  <span className="font-semibold">Company Name:</span> Cox IT
                </h4>
              </li>
              <li className="flex gap-x-[15px]">
                <RiLockPasswordLine className="text-primary text-[32px]" />
                <h4
                  className={`font-poppins text-[25px] font-normal capitalize ${
                    dark ? "text-black" : "text-white"
                  }`}
                >
                  <span className="font-semibold">Job position:</span> Teacher
                </h4>
              </li>
              <li className="flex gap-x-[15px]">
                <BsCircleHalf className="text-primary text-[25px]" />
                <h4
                  className={`font-poppins text-[18px] font-normal capitalize ${
                    dark ? "text-black" : "text-white"
                  }`}
                >
                  theme{" "}
                  <span className="inline-block ml-[15px]">
                    <DarkLight />
                  </span>
                </h4>
              </li>
            </ul>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
