import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../utils/use-onclick-outside";
import useLockBodyScroll from "../../utils/use-lock-body-scroll";
import "./shop-dropdown.styles.scss";

const ShopDropdown = ({ toggleShopDropdown, sections }) => {
  const shopDropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useOnClickOutside(shopDropdownRef, toggleShopDropdown, "ignore-co-shop");

  // prevent body scrolling
  useLockBodyScroll();

  return (
    <ul className="shop-dropdown" ref={shopDropdownRef}>
      {sections.map(({ id, title, linkUrl }) => (
        <li className="shop-category" key={id}>
          <Link
            className="shop-link"
            to={`/${linkUrl}`}
            onClick={toggleShopDropdown}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ShopDropdown;
