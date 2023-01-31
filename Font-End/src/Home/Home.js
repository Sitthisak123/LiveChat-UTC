import { Outlet } from 'react-router-dom';

import React from "react";
import Sidebar from "./Sidebar/Sidebar.js";
import { SLayout, SMain } from "./styles.js";

const Home = () => {
  return (
    <SLayout>
      <Sidebar />
      <SMain>{<Outlet />}</SMain>
    </SLayout>
  )
}
export default Home;
