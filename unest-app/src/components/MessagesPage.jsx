import React, {useEffect, useState} from 'react';
import {
    useNavigate
  } from "react-router-dom";
import axios from 'axios';
import './MessagesPage.css';
import Logo from '../Assets/Logo.png';
import House from '../Assets/house.png';
import profileIcon from '../Assets/Profile.png';
function MessagesPage() {
    const [inputSearch, setInputSearch] = useState('Search');
    const [isFocused, setIsFocused] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [display, setDisplay] = useState(true);
    const [user, setUser] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const buttonClicked = localStorage.getItem('isButtonClicked1');
        if (buttonClicked) {
            setIsClicked(true);
        }
        /*
        getInfo().then((d) => {
            console.log(d);
             setUser(d);})
             .catch(error => {console.error('Error fetching', error);});
             */
    }, []);

    
        const getInfo = async () => {
          //setShowOptions(true);
          try {
            const response = await axios.get('/api/users');
            console.log("Connects");
            console.log("Response.data: ", response.data);
            setUser(response.data);
            return response.data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    

    const toggle = () => {
        setDisplay(!display);
    };

    const handleInputChange = (event) => {
        setInputSearch(event.target.value);
    };

    const handleBlur = () => {
        if (!inputSearch.trim() && !isFocused) {
            setInputSearch('Search');
        }

    };

    const handleFocus = () => {
        setIsFocused(true);
        if (inputSearch === 'Search') {
            setInputSearch('');
        }
        setShowOptions(true);
    };

    const click = () => {
        setShowOptions(true);
    };

    const fetchUsers = async () => {
        return getInfo().then((d) => {
            console.log(d);
             setUser(d);})
             .catch(error => {console.error('Error fetching', error);});
        //return fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()).then((d) => setSearchResults(d))
    };

    const handleUnFocus = () => {
      setIsFocused(false);
    };

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/homepage', {replace: true})
    }

    const navigateToProfile = () => {
        navigate('/profile', {replace: true})
    }

    const navigateToOwner = () => {
        navigate('/messageOwner', {replace: true})
    }

    const navigateToOther = () => {
        setIsClicked(true);
        localStorage.setItem('isButtonClicked1', true);
        navigate('/message', {replace: true});
    } 

    return (
        <div>
        <div>
            <img src={Logo} alt="" style={{width: "100px", height: "100px"}} />
        </div>
        <div>
            <h1 className="font-oswald text-primary-800 mb-4 text-4xl font-medium" style={{position: "relative", top: "-70px"}}>Chat Messages</h1>
        </div>
        <div className="house">
        <img src={House} alt="" onClick={navigateToHome} style={{width: "50px", height: "50px"}} />
        </div>
        <div className="profile">
        <img src={profileIcon} alt="" onClick={navigateToProfile} style={{width: "50px", height: "50px"}} />
        </div>
        <div className="search">
        <input type="text" value={inputSearch} onClick={fetchUsers} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} style={{width: "800px", textAlign: "center", position: "relative", top: "-315px"}}/>
        </div>
        <div className="opt">
        {showOptions && (
        <ul>
          {user && user.filter(item => {
            if (!item || !inputSearch) {
                return true;
            }
            const firstName = item.first_name ? item.first_name.toLowerCase() : '';
            const lastName = item.last_name ? item.last_name.toLowerCase() : ''; 
            return ((inputSearch.toLowerCase() === '' ? item : firstName.includes(inputSearch)) || (inputSearch.toLowerCase() === '' ? item : lastName.includes(inputSearch)));
          }).map((item) => (
            <li className="listItem" key={item._id} onClick={handleUnFocus}>
              <a href={`/message/${encodeURIComponent(item.first_name)}?data=${encodeURIComponent(JSON.stringify({a1: item.first_name, a2: item.last_name, a3: item.username}))}`}>{item.first_name} {item.last_name}</a>
            </li>
          ))}
         {/* {user.map((item) => (
            <li className="listItem" key={item._id} onClick={handleUnFocus}>
              <a href={`/message/${encodeURIComponent(item.first_name)}?data=${encodeURIComponent(JSON.stringify({a1: item.first_name, a2: item.last_name}))}`}>{item.first_name} {item.last_name}</a>
            </li>
          ))} */}
           
        </ul>
      )}
        </div>
        {display ? (
        <div>
        <div className="my">
            <h2 style={{backgroundColor: "#ccc", color: "black", fontSize:"30px", position: "relative", top: "25px", left: "-40px"}}>
                My Properties
            </h2>
        </div>
        <div className="other">
            <button onClick={toggle} style={{backgroundColor: "white", color: "black", fontWeight: "bold", fontSize:"30px", width: "300px"}}>
                Other Properties
            </button>
        </div>
        <hr style={{display: "flex", position: "relative", top: "-190px", color: "gray"}}/>
        <div className="vl"></div>
        <div className="first">
        <button onClick={navigateToOther} style={{backgroundColor: "white", color: "black", width: "1415px", height: "100px", border: "2px solid black", fontWeight: isClicked ? "normal" : "bold"}}>
        <img src={profileIcon} alt="" style={{width: "50px", height: "50px"}} />
        <p style={{position: "relative", top: "-40px"}}>Tenant Name</p>
        <div class={isClicked ? '' : 'circle'}>
        </div>
        <p style={{position: "relative", top: "-40px"}}>Yes, I am interested!</p>
      </button>
      </div>
        </div>
        ) : (
            <div>
            <div className="my">
            <button onClick={toggle} style={{backgroundColor: "white", color: "black", fontWeight: "bold", fontSize:"30px", width: "300px", position: "relative", left: "-93px"}}>
                My Properties
            </button>
        </div>
        <div className="other">
            <h2 style={{backgroundColor: "#ccc", color: "black", fontSize:"30px", position: "relative", top: "-25px", left: "34px"}}>
                Other Properties
            </h2>
        </div>
        <hr style={{display: "flex", position: "relative", top: "-190px", color: "gray"}}/>
        <div className="vl"></div>
       
      <div className="first"> 
      <button onClick={navigateToOwner} style={{backgroundColor: "white", color: "black", width: "1415px", height: "100px", border: "2px solid black", fontWeight: "normal"}}>
      <img src={profileIcon} alt="" style={{width: "50px", height: "50px"}} />
      <p style={{position: "relative", top: "-40px"}}>Owner Name : Property Name</p>
      <p style={{position: "relative", top: "-40px"}}>Yes, what is the surrounding like?</p>
      </button>
      </div> 
      </div>
        )
        }
        </div>
    );
}

export default MessagesPage;