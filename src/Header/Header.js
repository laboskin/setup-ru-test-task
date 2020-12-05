import React from "react";
import {useStorage} from "../Storage/Storage";

function Header() {
    const {search, setSearch} = useStorage();
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper deep-purple accent-2">
                    <div className="input-field">
                        <input id="search" type="search" required value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons" onClick={() => setSearch('')}>close</i>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
