import React from "react";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <div className='ui header center item'>URL Shortner</div>
      <div className='right item'>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
