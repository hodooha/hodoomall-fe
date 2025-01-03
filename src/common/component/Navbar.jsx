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
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [value, setValue] = useState("");
  const [searchType, setSearchType] = useState("product");
  const [placeholder, setPlaceholder] = useState("제품검색");
  const [activeBtn, setActiveBtn] = useState(query.get("category" || "ALL"));
  const { cartItemCount } = useSelector((state) => state.cart);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = ["ALL", "TOP", "OUTER", "ALL-IN-ONE", "ACC", "SET", "HOME"];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  let path = useLocation().pathname;

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate(`/${searchType}?page=1`);
      }
      navigate(`/${searchType}?name=${event.target.value}&page=1`);
    }
  };
  const handelLogout = () => {
    dispatch(logout());
    navigate("/product?page=1");
  };

  const getProductListByCategory = (menu) => {
    setActiveBtn(menu);
    if (menu === "" || menu === "ALL") {
      navigate("/product?page=1");
    } else {
      navigate(`/product?category=${menu}&page=1`);
    }
    setValue("");
  };

  const goCouponPage = () => {
    navigate("/coupons");
  };

  const setPath = () => {
    if (path.includes("coupons")) {
      setPlaceholder("쿠폰검색");
      setSearchType("coupons");
      setActiveBtn("COUPON");
    } else if(path.includes("product")){
      setPlaceholder("제품검색");
      setSearchType("product");
      setActiveBtn(query.get("category") == null ? "ALL" : query.get("category"));
    } else{
      setActiveBtn("");
    }
  };

  useEffect(() => {
    setPath();
  }, [path, query]);

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder={placeholder}
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
          <button className="event-btn" onClick={goCouponPage}>
            COUPONS
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
              <div onClick={handelLogout} className="nav-icon">
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
        <Link to="/product?page=1">
          <img width={300} src="/image/hodoomall-logo.png" alt="logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          <button className={activeBtn === "COUPON" ? "menu-btn-active" : "event-btn"} onClick={goCouponPage}>
            COUPON
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
            placeholder={placeholder}
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
