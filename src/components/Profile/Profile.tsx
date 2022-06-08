import React, { FC } from 'react';
import './Profile.css';

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => (
  <div className="">
    <h2>Profile Page</h2>
    <h5>Welcome Bob</h5>
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-6 col-lg-3 container-box">
              <p><b><u>Profile details</u></b></p>
              <p>First Name: Bob</p>
              <p>Last Name: Smith</p>
              <p>Email: Bob.smith@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
