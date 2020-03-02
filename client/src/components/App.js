import React from "react";

import Header from "./Header";
import UrlCreate from "./Urls/UrlCreate";
import UrlShow from "./Urls/UrlShow";

import "./style.css";

const App = () => {
  return (
    <div className='ui container'>
      <Header />
      <UrlCreate />
      <UrlShow />
    </div>
  );
};

export default App;
