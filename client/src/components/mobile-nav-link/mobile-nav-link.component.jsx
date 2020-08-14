import React from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/icon.component";
import "./mobile-nav-link.styles.scss";

const MobileNavLink = ({ title, linkUrl, toggleNav }) => (
  <li className="mbl-nav-category">
    <Link className="mbl-nav-link" to={`/${linkUrl}`} onClick={toggleNav}>
      <Icon icon="trash" />
      {title}
      <Icon icon="arrow-right" />
    </Link>
  </li>
);

export default MobileNavLink;
