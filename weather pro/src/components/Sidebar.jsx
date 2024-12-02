import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({onDashboardClick}) => {
    
    return (
        <div className="sidebar-div">
            
            <h1 className="title-text"> Current Weather Forecast🌞</h1>
            <div className="sidebar-options">
                <Link className="btn-block" to="/" onClick={onDashboardClick}><h2>🎯 Dashboard</h2></Link>
                <Link className="btn-block" to="/" onClick={onDashboardClick}><h2>🔍 Search</h2></Link>
                <Link className="btn-block" to="/about"><h2>ℹ️ About</h2></Link>
            </div>
        </div>
    )
}

export default SideBar;