import React from "react";
import { DemoFeat } from "features";

/**
 * @page Home
 */
const HomePage = () => {
    return (
        <div className="page page-home">
            <h1>HomePage</h1>
            <p>Welcome to our GithubClient!</p>
            <DemoFeat borderColor="#0065cc" />
        </div>
    );
};

export default HomePage;
