import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BlockedUser from "../../components/BlockedUser";
import FriendRequest from "../../components/FriendRequest";
import Friends from "../../components/Friends";
import GroupList from "../../components/GroupList";
import Groups from "../../components/Groups";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import UserList from "../../components/UserList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { LoginUser } from "../../slices/LoginUser";
import { loginUserSlice } from "../../slices/LoginUser";
const Home = () => {
  let auth = getAuth();

  let [fix, setFix] = useState(false);
  let user = useSelector((state) => state.loginUser.value);
  let dark = useSelector((state) => state.darkMode.value);
  // console.log(user)

  const navigate = useNavigate();
  let dispatch = useDispatch();

  // let [verify, setVerify] = useState(false);

  // onAuthStateChanged(auth, (user) => {
  //   if (user.emailVerified) {
  //     setVerify(true);
      
  //     dispatch(LoginUser(user));
  //     localStorage.setItem("Login User", JSON.stringify(user));
  //   }
  // });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleScroll = () => {
    // console.log(window.scrollY ==max)
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  // git add .
  // git commit -m 'setting page'
  // git push

  return (
    <>
      {/* {verify ? ( */}
        <div
          className={`xl:flex justify-between  xl:p-0 ${
            dark ? "bg-white" : "bg-black"
          }`}
        >
          <div
            className={`w-full block xl:hidden xl:w-[14%]  ${
              fix ? "fixed top-0 left-0 z-[99999]" : ""
            }`}
          >
            <Sidebar active="home" />
          </div>
          <div className="w-full hidden xl:w-[14%] xl:block">
            <Sidebar active="home" />
          </div>
          <div className="w-full xl:w-[84%] p-2.5  flex flex-wrap gap-x-5 gap-y-10">
            {/* search & friends */}
            <div className="w-full xl:w-[400px]">
              <Search />
              <Friends />
            </div>
            {/* user list  */}
            <div className="w-full xl:w-[334px]">
              <UserList />
            </div>
            {/* friends request */}
            <div className="w-full xl:w-[334px]">
              <FriendRequest />
            </div>
            {/* my group list */}
            <div className="w-full xl:w-[400px]">
              <Groups />
            </div>
            {/* group list */}
            <div className="w-full xl:w-[334px]">
              <GroupList />
            </div>
            {/* blocked list */}
            <div className="w-full xl:w-[334px]">
              <BlockedUser />
            </div>
          </div>
          {/* ${fix ?"fixed top-0 left-0":""} */}
        </div>
       {/* ) : (
        <div className=" w-screen h-screen flex justify-items-center items-center">
          <div className=" bg-heading  rounded  text-center w-full ">
            <h1 className="text-white p-10 font-nunito font-bold  text-5xl">
              Please Verify Mail !
            </h1>
            <button className="bg-white px-4 py-3 mb-2.5 font-pop font-semibold text-lg text-[#EA6C00]">
              <NavLink to="/login">Back To Login</NavLink>
            </button>
            <button className="bg-white px-4 py-3 mb-2.5 font-pop font-semibold text-lg text-[#EA6C00] ml-5">
              <a
                href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                target="_blank"
              >
                {" "}
                Go To mail
              </a>
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Home;
