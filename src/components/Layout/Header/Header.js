import React from 'react';

import Navigation from '../Navigation/Navigation';
import mealsImage from '../../../assets/meals.jpg';
import './Header.css';

const Header = props => {
    return (
        <React.Fragment>
            <header className="header">
                <h1 style={{marginLeft:"3rem"}}>React Food App</h1>
                <Navigation onSecondLevelMOdalShow = {props.onModalShowHandler}/>
            </header>
            <div className="main-image">
                <img src={mealsImage} alt="Meals Image"/>
            </div>
        </React.Fragment>
    )
}

export default Header;