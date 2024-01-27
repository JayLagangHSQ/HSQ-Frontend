import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/userContext';
import UserInfoBox from '../Subcomponents/UserInfoBox';
import ComingSoonBadge from './components/ComingSoonBadge';
import NewFeatureBadge from './components/NewFeatureBadge';
import MyCalendarDropdown from './components/MyCalendarDropdown';
import HsqToolsDropDown from './components/HsqToolsDropDown';
const AppSidebar = () => {
  const {user} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMyCalendarDropped, setIsMyCalendarDropped] = useState(false);
  const [isHsqToolsDropped, setIsHsqToolsDropped] = useState(false);

  const toggleSidenavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleMyCalendarClick = () =>{
    isMyCalendarDropped ? setIsMyCalendarDropped(false) :setIsMyCalendarDropped(true)
  }
  const handleHsqToolsClick = () =>{
    isHsqToolsDropped ? setIsHsqToolsDropped(false) : setIsHsqToolsDropped(true)
  }
  return (
    <div className={`sidenavbar ${isOpen ? 'is-open' : ''} ml-auto `}>
      <div className='p-2'>
        <UserInfoBox user={user}/>
      </div>
      
      <div className="sidenavbar-toggle" onClick={toggleSidenavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className="sidenavbar-content">
        {/* Add sidenavbar content here */}
        <Link to='/' className=''>Home</Link>
        <Link to={'/my-profile/detail'}>My Profile</Link>
        {/* Below is  for MyCalendarDropdown */}
        <div className='mb-2'>
          <span className='linkStyle' onClick={handleMyCalendarClick}>My Calendar</span>
          <MyCalendarDropdown ComingSoonBadge={ComingSoonBadge} isMyCalendarDropped={isMyCalendarDropped}/>
        </div>
        <div className='mb-2'>
          <span className='user-select-none text-muted'>My Department <ComingSoonBadge/></span>
        </div>
        <Link to={'/news-and-updates'}>News & Updates</Link>
        <Link to='/forms-repository' className=''>Forms Repository</Link>
        <Link to={'/team-directory'}>Team Directory</Link>
        <div className='mb-2'>
          <span className='linkStyle' onClick={handleHsqToolsClick}>HSQ Apps</span>
          <HsqToolsDropDown ComingSoonBadge={ComingSoonBadge} isHsqToolsDropped={isHsqToolsDropped}/>
        </div>
        <Link to={'/wiki'}>Wiki</Link>
        
        {/* <p className='user-select-none'><span className='text-muted'>Wiki <ComingSoonBadge/></span></p> */}
        
        {/* Add more sidenavbar links as needed */}
      </div>
    </div>
  );
};

export default AppSidebar;
