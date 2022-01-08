import "./Profile.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
const Profile = () => {
  const [password, setPassword] = useState("");
  const [newpass, setNewpass] = useState("");
  const [Address, setAddress] = useState('');
  const email = atob(localStorage.getItem("token")?.split(".")[1]);

useEffect(async () => {
    let data = { email, id:atob(localStorage.getItem("token")?.split(".")[0]) };
      await axios
        .post(`http://localhost:3000/api/authentication/GetAddress`, data)
        .then((res) => {
          if (res.data.status == "ok") {
            setAddress(res.data.data.address);
          } else {
            alert("Incorrect password");
          }
        });
}, []);

  const Updatepass = async () => {
    let data = { email, password: password, newpassword: newpass };
    if (password == "" || newpass == "") {
      alert("please type the newpass and original pass");
    } else {
      await axios
        .post(`http://localhost:3000/api/authentication/UpdatePass`, data)
        .then((res) => {
          if (res.data.status == "ok") {
            alert("Updated");
            setNewpass("");
            setPassword("");
          } else {
            alert("Incorrect password");
          }
        });
    }
  };

  const UpdateAddress= async ()=>{
      if(Address){
          let data = { email, address: Address, id: atob(localStorage.getItem("token")?.split(".")[0]) };
      await axios
        .post(`http://localhost:3000/api/authentication/UpdateAddress`, data)
        .then((res) => {
          if (res.data.status == "ok") {
            alert("Updated");
          } else {
            alert("Incorrect password");
          }
        });
      }

  }


  return (
    <>
      <div class="settings-page text-white">
          <div className="text-2xl" onClick={(e)=>{
              document.location='/';
          }}>Back</div>
        <div class="settings-container">
          <h1 class="page-title">Account</h1>
          <div class="settings-section">
            <h2 class="settings-title">General Information</h2>
            <div>
              <div class="non-active-form">
                <p class="capitalize">
                  {
                    atob(localStorage.getItem("token")?.split(".")[1]).split(
                      "@"
                    )[0]
                  }
                </p>
                <i class="fas fa-pen"></i>
              </div>
            </div>
            <div>
              <div class="non-active-form">
                <p class="capitalize">
                  {atob(localStorage.getItem("token")?.split(".")[1])}
                </p>
                <i class=""></i>
              </div>
            </div>
            <div></div>
          </div>
          <div class="settings-section">
            <h2 class="settings-title">My profile</h2>
            <form class="form my-form">
              <div class="img-upload-container">
                <label
                  class="img-upload btn btn-bwm"
                  style={{
                    "background-image":
                      "url(&quot;/profile-placeholder.jpg&quot;)",
                  }}
                >
                  <input
                    type="file"
                    accept=".jpg, .png, .jpeg, .gif"
                    value=""
                  />
                </label>
                <h4>Change Your Profile Picture</h4>
                <div class="img-preview-container">
                  <div
                    class="img-preview"
                    style={{
                      "background-image":
                        "url('https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg')",
                    }}
                  ></div>
                </div>
              </div>
              <div class="form-submit">
                <button class="btn button full" type="submit" disabled="">
                  Save New Picture
                </button>
              </div>
            </form>
          </div>
          <div class="settings-section">
            <h2 class="settings-title">Address</h2>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    name="currentPassword"
                    placeholder="Add Address"
                    type="text"
                    class="w-full h-14 text-black"
                    autocomplete="Old Password"
                    value={Address}
                  />
                  <span class="focus-input"></span>
                </div>
              </div>
              <div class="form-submit right">
                <button
                  onClick={UpdateAddress}
                  class="btn button bg-yellow-500 rounded-2xl mt-2 full"
                  type="submit"
                  disabled=""
                >
                  Change Address
                </button>
              </div>
          </div>
          <div class="settings-section">
            <h2 class="settings-title">Password</h2>
            <div class="form my-form">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    name="currentPassword"
                    placeholder="Old Password"
                    type="password"
                    class="form-control"
                    autocomplete="Old Password"
                  />
                  <span class="focus-input"></span>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    name="password"
                    onChange={(e) => setNewpass(e.target.value)}
                    placeholder="New Password"
                    type="password"
                    class="form-control mt-5"
                    autocomplete="New Password"
                  />
                  <span class="focus-input"></span>
                </div>
              </div>
              <div class="form-submit mt-2">
                <button
                  onClick={Updatepass}
                  class="btn button full"
                  type="submit"
                  disabled=""
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
