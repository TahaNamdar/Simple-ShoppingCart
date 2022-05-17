import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/esm/Table";
import { DLT } from "../redux/actions/action";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { ADDTOBALANCE, REDUCEBALANCE } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  const [query, setQuery] = useState("");
  // console.log(price);
  const navigate = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts);
  const getdataBalance = useSelector((state) => state.balanceReducer.balance);
  console.log(getdataBalance);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //balance
  const [balance, setBalance] = useState(null);
  const openBalance = Boolean(balance);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickBalance = (event) => {
    setBalance(event.currentTarget);
  };
  const handleCloseBalance = () => {
    setBalance(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  const totalResultBadge = getdata.reduce((acc, current) => {
    return acc + current.qnty;
  }, 0);

  //balance
  const inputHandler = (e) => {
    setQuery(e.target.value);
  };

  const paymnetClick = () => {
    dispatch(ADDTOBALANCE(query));
  };

  const withDrawClick = () => {
    dispatch(REDUCEBALANCE(query));
  };

  const payments = getdataBalance.filter((item) => item.status === "payment");
  const withDraw = getdataBalance.filter((item) => item.status === "withDraw");

  const totalPayments = payments.reduce((acc, curr) => {
    return acc + Number(curr.value);
  }, 0);
  const totalWithDraw = withDraw.reduce((acc, curr) => {
    return acc + Number(curr.value);
  }, 0);

  const result = Number(totalPayments) - Number(totalWithDraw);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={totalResultBadge}
            color="primary"
            className="m-icon"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
          {/* Balance */}
          <Badge
            color="primary"
            id="basic-button"
            aria-controls={openBalance ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openBalance ? "true" : undefined}
            onClick={handleClickBalance}
            className="m-icon"
          >
            <i
              className="fa-solid fa-credit-card-alt text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e, i) => {
                    return (
                      <div key={i}>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                style={{ width: "5rem", height: "5rem" }}
                                alt=""
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>

                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </div>
                    );
                  })}
                  <p className="text-center">Total :₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 22 }}>Your carts is empty</p>
              <img
                src="./cart.gif"
                alt=""
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>

        {/* Balance */}
        <Menu
          id="basic-menu"
          anchorEl={balance}
          open={openBalance}
          onClose={handleCloseBalance}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div
            className="card_details d-flex justify-content-center align-items-center"
            style={{ width: "24rem", padding: 10, position: "relative" }}
          >
            <i
              className="fas fa-close smallclose"
              onClick={handleCloseBalance}
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
            ></i>
            <div>
              <div className="center">
                <img
                  src="./wallet.gif"
                  alt=""
                  className="emptycart_img"
                  style={{ width: "5rem", padding: 10, borderRadius: 20 }}
                />
                <p style={{ fontSize: 22, alignSelf: "end" }}>Wallet</p>
              </div>

              <div className="center">
                <TextField
                  id="standard-basic"
                  label="number"
                  variant="standard"
                  size="small"
                  color="secondary"
                  className="p-none"
                  inputProps={{ type: "number" }}
                  onChange={inputHandler}
                  style={{ margin: 6 }}
                />

                <Button
                  variant="contained"
                  color="success"
                  style={{ margin: 6 }}
                  onClick={paymnetClick}
                >
                  Payment
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: 6 }}
                  onClick={withDrawClick}
                  color="error"
                >
                  WithDraw
                </Button>
              </div>

              <hr />
              <div className="flexbox">
                <Button
                  variant="string"
                  style={{ margin: 6, alignSelf: "center" }}
                  onClick={() => navigate("/history")}
                >
                  History
                </Button>
                <p>Inventory : {result} </p>
              </div>
            </div>
          </div>
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
