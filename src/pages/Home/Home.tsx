// import React from 'react'
import MainArea from '../../Components/MainArea/MainArea'
import Sidebar from '../../Components/HomeSidebar/Sidebar'
 
import './Home.css'
 
const Home = () => {
  return (
    <>
      <div className="homecontainer">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-area">
          <MainArea />
        </div>
      </div>
    </>
  )
}
 
export default Home
 