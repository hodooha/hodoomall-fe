import React, { useEffect, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import SearchBox from "../../common/component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import CouponTable from "./components/CouponTable";
import { ColorRing } from "react-loader-spinner";
import { getCouponList } from "../../features/coupon/couponSlice";
import Swal from 'sweetalert2';
import NewCouponDialog from "./components/NewCouponDialog";

const AdminCouponPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const { error, loading, couponList, totalPageNum, selectedCoupon } = useSelector((state) => state.coupon);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    couponNum: query.get("couponNum") || "",
  });
  const [mode, setMode] = useState("new");
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const tableHeader = [
    "#",
    "Coupon#",
    "Name",
    "Description",
    "DCRate",
    "Minimum cost",
    "ExpiryDate",
    ""
  ];

  useEffect(() => {
    // dispatch();
  }, [query]);

  useEffect(() => {
    if (searchQuery.couponNum === "") {
      delete searchQuery.couponNum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate("?" + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
    // dispatch();
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickNewCoupon = () => {
    setMode("new");
    setShowDialog(true);
  };

  const deleteCoupon = (id) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(deleteCoupon(id));
      }
    });
    
  };

  if (loading) {
    return (
      <div className="spinner">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2  mb-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="쿠폰이름"
            field="name"
          />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewCoupon}>
          Add New Coupon +
        </Button>
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <CouponTable
            header={tableHeader}
            data={couponList}
            openEditForm={openEditForm}
            deleteCoupon={deleteCoupon}
          />
        )}

        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPageNum}
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
      </Container>

      <NewCouponDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};
export default AdminCouponPage;
