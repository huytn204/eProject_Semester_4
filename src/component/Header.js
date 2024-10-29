import { memo, useState } from 'react';
import './header.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatter } from 'component/Style/utils/formater';
import { ROUTERS } from 'component/Style/utils/router';
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, 
    AiOutlineMail,
    AiOutlineTwitter,AiOutlineSearch } from 'react-icons/ai';


const Header = () =>{

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = '/login';
        alert("LogOut successfully.")
    }
    const [query , setQuery] = useState('');
    const [keyword , setKeyword] = useState('');
    const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/hotels/search?keyword=${keyword}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed:', error.response.data);
    }
  };

    const[IsShowCategory, setShowCategory] = useState (true);
    const[menus] = useState ([
        {
            name: "Home",
            path: ROUTERS.USER.HOME,
        },
        {
            name: "Rooms",
            path: ROUTERS.USER.ROOMS,
        },
        { 
            name: "Houses",
            path: ROUTERS.USER.HOUSES,
               
        },
        {
            name: "isBooked",
            path: ROUTERS.USER.BOOKED,
        },
        {
            name: "Contact",
            path: ROUTERS.USER.CONTACT,
        },
    ])
    return (
        <>
            <div className='header_top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 header_top_left'>
                            <ul>
                                <li>
                                    <AiOutlineMail />  
                                    
                                    admin@gmail.com
                                    
                                </li>
                                <li> giảm giá 10% cho đơn từ {formatter(2000000)}</li>
                            </ul>
                        </div>
                        <div className='col-6 header_top_right'>
                            <ul>
                                <li><Link to={"#"}><AiOutlineFacebook /></Link></li>
                                <li><Link to={"#"}><AiOutlineInstagram/></Link></li>
                                <li><Link to={"#"}><AiOutlineLinkedin/></Link></li>
                                <li><Link to={"#"}><AiOutlineTwitter/></Link></li>

                                <li><Link to={"/login"}>Login</Link></li>
                                
                                 {/* <NavDropdown className='setting' title="Profile">
                                        <Link className='tk' to={"/login"}>Login</Link><br />
                                        <NavDropdown.Item className='tk1' onClick={ handleLogout} >Logout</NavDropdown.Item>
                                    </NavDropdown> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container header-box'>
                <div className='row'>
                    <div className='col-xl-3'>
                        <div className='header_logo'>
                            <b>MODERN</b><br />
                            <span>BEST HOTEL</span>
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <nav className='header_menu'>
                            <ul>
                                {
                                    menus?.map((menu, menuKey) =>(
                                        <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                            <Link to={menu?.path}>{menu?.name}</Link>
                                            {
                                                menu.child && (
                                                    <ul className='haeder_menu_sp'>
                                                        {
                                                            menu.child.map((childItem, childKey) => (
                                                                <li key={`${childKey}-${childKey}`}>
                                                                    <Link to={childItem.path}>{childItem.name}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                        
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                                
                            </ul>
                        </nav>
                    </div>
                    <div className='col-xl-3'>
                        <div className='hero_search_form search'>
                            <form>
                                <input className='ip_search' type='text' placeholder='search' value={query} onChange={(e) => setQuery(e.target.value)} />
                                <button  type='submit' className='site-button st_search' onClick={handleSearch}><AiOutlineSearch /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}
export default Header;