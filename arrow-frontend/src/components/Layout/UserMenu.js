import React from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const UserMenu = () => {
  const [auth] = useAuth();
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h6 className="mt-3">User Dashboard - Welcome {auth?.user?.name}</h6>
        <NavLink
          to="/dashboard/user/dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/update-password"
          className="list-group-item list-group-item-action"
        >
          Update Password
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
