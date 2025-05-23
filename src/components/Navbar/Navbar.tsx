import React from 'react';
import { options } from '../../data/options';
import '../Navbar/NavBar.css';
import logo from '../../assets/logo.svg';
import cart from '../../assets/cart.svg';
import { NavLink, Link } from 'react-router-dom';

interface NavbarProps {
  cartItemCount?: number;
  handleCartItemCount?: (count: number) => void;
}

export function Navbar({ cartItemCount = 0, handleCartItemCount }: NavbarProps): React.ReactElement {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navigation">
        {options.map((item, index) => (
          <NavLink
            key={index}
            to={`/${item.id}`}
            className={({ isActive }) =>
              `radio-item-navbar ${isActive ? 'active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `cart-button ${isActive ? 'active' : ''}`
          }
        >
          <img src={cart} alt="Cart" />
          <div className="number-of-selected-products" onClick={() => handleCartItemCount?.(cartItemCount + 1)}>{cartItemCount}</div>
        </NavLink>
      </div>
    </div>
  );
} 