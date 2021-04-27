import React from "react";

const Navigation = ({ OnRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ 'display': 'flex', 'justifyContent': 'flex-end' }}>
                <p onClick={() => OnRouteChange('signin')}
                    className="f3 link dim black underline pa3 pointer">
                    Sign out</p>
            </nav>
        );
    }
    else {
        return (
            <nav style={{ 'display': 'flex', 'justifyContent': 'flex-end' }}>
                <p onClick={() => OnRouteChange('register')}
                    className="f3 link dim black underline pa3 pointer">
                    Register</p>
                <p onClick={() => OnRouteChange('signin')}
                    className="f3 link dim black underline pa3 pointer">
                    Sign In</p>
            </nav>
        );
    }
};

export default Navigation;
