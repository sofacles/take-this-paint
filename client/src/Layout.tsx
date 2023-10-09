import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/give-away">Give away paint</Link>
          </li>
          <li>
            <Link to="/view-paints">View paints</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}

export default Layout;
