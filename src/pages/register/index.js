import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [success, setSuccess] = useState("");
  let [view, setView] = useState(true);

  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [ferr, setFerr] = useState("");
  let [roll, setRoll] = useState("");
  let [rollerr, setRollerr] = useState("");
  let [session, setSession] = useState("");
  let [sessionerr, setSessionerr] = useState("");
  let [department, setDepartment] = useState("");
  let [departmenterr, setDepartmenterr] = useState("");
  let [companyN, setCompanyN] = useState("");
  let [position, setPosition] = useState("");

  let [loading, setLoading] = useState(false);

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const strongPassword =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
      password
    );

  let handleView = () => {
    if (!view) {
      setView(true);
    } else {
      setView(false);
    }
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handleName = (e) => {
    setName(e.target.value);
    setNameerr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handsession = (e) => {
    setSession(e.target.value);
    setSessionerr("");
  };

  let handdepartment = (e) => {
    setDepartment(e.target.value);
    setDepartmenterr("");
  };
  let handleRoll = (e) => {
    setRoll(e.target.value);
    setRollerr("");
  };
  let handleCompany = (e) => {
    setCompanyN(e.target.value);
  };
  let handlePosition = (e) => {
    setPosition(e.target.value);
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("email Required");
    } else if (!validEmail) {
      setEmailerr("Valid email Required");
    }

    if (!name) {
      setNameerr("name Required");
    } else if (name.length <= 2) {
      setNameerr("name contain more than 2 charecter");
    }

    if (!password) {
      setPassworderr("password Required");
    }
    //  else if (!/^(?=.*[a-z])/.test(password)) {
    //   setPassworderr("lowercase Required");
    // } else if (!/^(?=.*[A-Z])/.test(password)) {
    //   setPassworderr("uppercase Required");
    // } else if (!/^(?=.*[0-9])/.test(password)) {
    //   setPassworderr("number Required");
    // } else if (!/^(?=.*[!@#\$%\^&\*])/.test(password)) {
    //   setPassworderr("symbol Required");
    // } else if (!/^(?=.{8,})/.test(password)) {
    //   setPassworderr("minimum 8 cherecter Required");
    // }

    // strongPassword

    if (!roll) {
      setRollerr("Roll Number Required");
    }
    if (!session) {
      setSessionerr("Required");
    }
    if (!department) {
      setDepartmenterr("Required");
    }

    if (
      email &&
      name &&
      password &&
      validEmail &&
      roll &&
      session &&
      department
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "images/user2.jpg",
          })
            .then(() => {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  setSuccess("varify mail send");
                })
                .then(() => {
                  set(ref(db, "users/" + user.user.uid), {
                    name: user.user.displayName,
                    email: user.user.email,
                    photoURL: user.user.photoURL,
                    roll: roll,
                    session: session,
                    department: department,
                    companyN: companyN,
                    position: position,
                  }).then(() => {
                    setFerr("");
                    setSuccess("active your account via mail");
                    setLoading(false);
                    setTimeout(() => {
                      navigate("/login");
                    }, 1500);
                  });
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setSuccess("");
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFerr("Email already exits");
          }
          setLoading(false);
        });
    }
  };

  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setSuccess("login successfull");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setFerr(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="registration">
      <div
        className="w-screen h-screen flex justify-items-center items-center"
        style={{
          // background: "#5F34F5",
          background: "#807DC8",
          // backgroundImage: 'url("images/signBG.png")',
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[450px]  drop-shadow-2xl pt-[50px] px-[40px] pb-[30px] bg-white mx-auto md:rounded-md">
          <div>
            <h2 className="text-center text-4xl font-bold text-heading font-nunito uppercase mb-[10px]">
              register
            </h2>
            <p className="font-nunito text-center text-heading text-sm font-normal mb-[20px]">
              Get started with easily register
            </p>

            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px] mb-[20px]"
                type="text"
                placeholder="Full Name"
                onChange={handleName}
              />
              {nameerr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                  <h3 className="text-white font-normal font-poppins text-sm">
                    {nameerr}
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-nunito pb-[10px] mb-[20px]"
                type="email"
                placeholder="Email Adress"
                onChange={handleEmail}
              />
              {emailerr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                  <h3 className="text-white font-normal font-poppins text-sm">
                    {emailerr}
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <input
                className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px]  mb-[10px]"
                type={view ? "password" : "text"}
                placeholder="Password"
                onChange={handlePassword}
              />
              {passworderr ? (
                <div className="bg-red px-[5px] py-[2px] rounded mt-[-5px] absolute left-0 bottom-[-14px] w-full">
                  <h3 className="text-white font-normal font-poppins text-sm">
                    {passworderr}
                  </h3>
                </div>
              ) : (
                ""
              )}

              <button
                className="absolute right-[9px] top-[9px] text-[18px] text-heading"
                onClick={handleView}
              >
                {view ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <div>
              <div>
                <div className="relative">
                  <input
                    className="w-full border-b-2 border-[#e7e7e7] text-[20px] mt-5 font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px] mb-[20px]"
                    type="number"
                    placeholder="Roll Number"
                    onChange={handleRoll}
                  />
                  {rollerr ? (
                    <div className="bg-red px-[5px] py-[2px] rounded mt-[-25px] absolute left-0 bottom-0 w-full">
                      <h3 className="text-white font-normal font-poppins text-sm">
                        {rollerr}
                      </h3>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <dvi className="flex justify-between my-4 ">
                    <div className="relative">
                      <select
                        onChange={handsession}
                        className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading"
                      >
                        <option value="">Session</option>
                        <option value="2010-2011">2010-2011</option>
                        <option value="2011-2012">2011-2012</option>
                        <option value="2012-2013">2012-2013</option>
                        <option value="2013-2014">2013-2014</option>
                        <option value="2013-2014">2014-2015</option>
                        <option value="2013-2014">2015-2016</option>
                        <option value="2013-2014">2016-2017</option>
                        <option value="2013-2014">2017-2018</option>
                        <option value="2013-2014">2018-2019</option>
                        <option value="2013-2014">2019-2020</option>
                        <option value="2013-2014">2020-2021</option>
                        <option value="2013-2014">2021-2022</option>
                        <option value="2013-2014">2022-2023</option>
                        <option value="2013-2014">2023-2024</option>
                      </select>
                      {sessionerr ? (
                        <div className="bg-red px-[5px] py-[2px] rounded   absolute left-0 bottom-0] w-full">
                          <h3 className="text-white font-normal font-poppins text-sm">
                            {sessionerr}
                          </h3>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="relative">
                      <select
                        onChange={handdepartment}
                        className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading"
                      >
                        <option value="">Department</option>
                        <option value="CMT">CMT</option>
                        <option value="CT">CT</option>
                        <option value="ET">ET</option>
                        <option value="FT">FT</option>
                        <option value="RAC">RAC</option>
                        <option value="THM">THM</option>
                      </select>
                      {departmenterr ? (
                        <div className="bg-red px-[5px] py-[2px] rounded  absolute left-0 bottom-0] w-full">
                          <h3 className="text-white font-normal font-poppins text-sm">
                            {departmenterr}
                          </h3>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </dvi>

                  <input
                    className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading  mt-3
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px] mb-[20px]"
                    type="text"
                    placeholder="Company Name"
                    onChange={handleCompany}
                  />
                  <input
                    className="w-full border-b-2 border-[#e7e7e7] text-[20px] font-medium font-poppins text-heading  
                placeholder:text-sm placeholder:font-normal placeholder:text-heading placeholder:font-poppins pb-[10px] mb-[20px]"
                    type="text"
                    placeholder="Position (optional) "
                    onChange={handlePosition}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <div className="w-full md:rounded-[50px] mt-[30px] py-[12px] mx-auto text-black flex justify-center items-center bg-primary">
                <TailSpin
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                className="w-full text-[20px] font-medium font-nunito py-[12px] bg-primary text-white capitalize md:rounded-[50px] mt-[30px] "
                onClick={handleSubmit}
              >
                sign up
              </button>
            )}
            {success ? (
              <div className="bg-green px-[5px] py-[2px] rounded mt-[10px]  w-full">
                <h3 className="text-white font-normal font-nunito text-sm">
                  {success}
                </h3>
              </div>
            ) : (
              ""
            )}
            {ferr ? (
              <div className="bg-red px-[5px] py-[2px] rounded mt-[10px]  w-full">
                <h3 className="text-white font-normal font-nunito text-sm">
                  {ferr}
                </h3>
              </div>
            ) : (
              ""
            )}

            <div className="text-center ">
              <button
                className="p-[10px] rounded-[50px]  border text-[25px] mt-[15px]"
                onClick={handleGoogle}
              >
                <FcGoogle />
              </button>
            </div>
            <div className="text-center mt-[5px]">
              <p className="text-center font-nunito text-heading text-sm font-normal">
                Already have an account ?{" "}
                <span className="text-[#EA6C00] cursor-pointer ">
                  <NavLink to="/login">sign in</NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
