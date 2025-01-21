import React from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const SubAdminMenu = () => {
  const [auth] = useAuth();
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h6 className="mt-3">User Dashboard - Welcome {auth?.user?.name}</h6>
        <NavLink
          to="/dashboard/sub-admin/dashboard"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/sub-admin/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/sub-admin/update-password"
          className="list-group-item list-group-item-action"
        >
          Update Password
        </NavLink>
        <NavLink
          to="/dashboard/sub-admin/orders"
          className="list-group-item list-group-item-action"
        >
          View Orders
        </NavLink>
      </div>
    </div>
  );
};

export default SubAdminMenu;
