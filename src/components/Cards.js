import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD } from "../redux/actions/action";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts);

  const send = (e) => {
    dispatch(ADD(e));
  };

  return (
    <div className="container mt-1">
      
        

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <>
              <Card
                style={{ width: "22rem", border: "none", marginBottom: "2rem", }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text style={{fontFamily:'Vazir'}}>قیمت :  {element.price} هزار تومان</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="dark"
                      onClick={() => send(element)}
                      className="col-lg-12"
                      style={{fontFamily:'Vazir'}}
                    >
افزودن به سبد خرید                    </Button>
                  </div>
                </Card.Body>
              </Card>
              
            </>
          );
        })}
         
      </div>

    </div>
  );
};

export default Cards;
