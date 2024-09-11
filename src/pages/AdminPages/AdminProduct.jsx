import React, { useEffect, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import SearchBox from "../../common/component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import NewItemDialog from "./components/NewItemDialog";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import { ColorRing } from "react-loader-spinner";
import { getProductList } from "../../features/product/productSlice";
import "../AdminPages/AdminProduct.style.css";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const { productList, totalPageNum, loading, error } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });

  const [mode, setMode] = useState("new");
  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];

  useEffect(() => {
    dispatch(getProductList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query);
  }, [searchQuery]);

  const deleteItem = (id) => {
    // dispatch(deleteProduct(id));
  };

  const openEditForm = (product) => {
    setMode("edit");
    setShowDialog(true);
    // dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product });
  };

  const handleClickNewItem = () => {
    setMode("new");
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
    // dispatch(getProductList({ ...searchQuery }));
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
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <ProductTable
            header={tableHeader}
            data={productList}
            deleteItem={deleteItem}
            openEditForm={openEditForm}
          />
        )}
    
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
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

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default AdminProduct;
