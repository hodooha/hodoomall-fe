import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../features/user/userSlice";
import EventPopup from "./EventPopup";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [value, setValue] = useState("");
  const [activeBtn, setActiveBtn] = useState(query.get("category" || "ALL"));
  const { cartItemCount } = useSelector((state) => state.cart);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = ["ALL", "TOP", "OUTER", "ALL-IN-ONE", "ACC", "SET", "HOME"];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/product");
      }
      navigate(`/product?name=${event.target.value}&page=1`);
    }
  };
  const logout = () => {
    dispatch(userActions.logout());
    navigate("/product");
  };

  const getProductListByCategory = (menu) => {
    setActiveBtn(menu);
    if (menu === "" || menu === "ALL") {
      return navigate("/product");
    }
    navigate(`/product?category=${menu}&page=1`);
    setValue("");
  };

  const goEventPage = () => {
    navigate("/event");
  };

  useEffect(() => {
    setActiveBtn(query.get("category") || "ALL");
  }, [query]);

  return (
    <div>
      <EventPopup></EventPopup>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                onKeyPress={onCheckEnter}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onClick={() => setValue("")}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          <button className="event-btn" onClick={goEventPage}>
            EVENT
          </button>
          {menuList.map((menu, index) => (
            <button key={index} onClick={() => getProductListByCategory(menu)}>
              {menu}
            </button>
          ))}
        </div>
      </div>
      {user && user.level === "admin" && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                <span className="mobile-hide" style={{ cursor: "pointer" }}>
                  로그아웃
                </span>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                  setActiveBtn("");
                }}
                className="nav-icon"
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="mobile-hide" style={{ cursor: "pointer" }}>
                  로그인
                </span>
              </div>
            )}
            <div
              onClick={() => {
                navigate("/cart");
                setActiveBtn("");
              }}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faShoppingBag} />

              <span
                className="mobile-hide"
                style={{ cursor: "pointer" }}
              >{`카트(${user ? cartItemCount : 0})`}</span>
            </div>
            <div
              onClick={() => {
                navigate("/my/purchase");
                setActiveBtn("");
              }}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              <span className="mobile-hide" style={{ cursor: "pointer" }}>
                마이페이지
              </span>
            </div>

            <div
              className="nav-icon mobile-active"
              onClick={() => {
                setShowSearchBox(true);
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={500} src="/image/logo.png" alt="logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          <button className="event-btn" onClick={goEventPage}>
            EVENT
          </button>
          {menuList.map((menu, index) => (
            <li key={index}>
              <button
                className={activeBtn === menu ? "menu-btn-active" : ""}
                onClick={() => getProductListByCategory(menu)}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>

        <div className="search-box landing-search-box mobile-hide">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="제품검색"
            onKeyPress={onCheckEnter}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onClick={() => setValue("")}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
