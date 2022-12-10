import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import './navigation.styles.scss';
import {ReactComponent as CrownSvg} from '../../assets/crown.svg';

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownSvg/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">Shop</Link>
          <Link className="nav-link" to="/sign-in">Sign Up</Link>
        </div>
      </div>
      <Outlet/>
    </Fragment>
  )
};
export default Navigation;