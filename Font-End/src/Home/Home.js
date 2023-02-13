import React from "react";
import Sidebar from "./Sidebar/Sidebar.js";
import { SLayout, SMain } from "./styles.js";

const Home = ({ children }) => {
  return (
    <SLayout>
      <Sidebar />
      <SMain>{ children }</SMain>
    </SLayout>
  )
}
export default Home;
