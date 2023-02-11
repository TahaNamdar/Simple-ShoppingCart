import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useSelector } from "react-redux";
import moment from "jalali-moment";

export default function History() {
  const getdataBalance = useSelector((state) => state.balanceReducer.balance);

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
    <List
      sx={{
        width: "100%",
        maxWidth: 560,
        maxHeight: 580,
        bgcolor: "background.paper",
        margin: "22px auto",
        overflowY: "scroll",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <CalendarTodayIcon />
          <span style={{ margin: 4, alignSelf: "center",fontFamily:'Vazir'  }}>تراکنش ها</span>
        </ListSubheader>
      }
    >
      <div>
        {getdataBalance.map((date, i) => {
          return (
            <div key={i}>
              <div className="flexbox">
                <p style={{fontFamily:'Vazir' }}>{date.value} هزار تومان</p>
                <p>
                  {moment(date.createdAt).locale("fa").format("YYYY/MM/DD")}
                </p>

                <p>{date.status}</p>
              </div>
            </div>
          );
        })}
      </div>

      {result >= 0 ? (
        <p style={{ marginLeft: 52, padding: 10,fontFamily:'Vazir'  }}> موجودی  : {result}</p>
      ) : (
        <p style={{ marginLeft: 52, padding: 10, color: "red",fontFamily:'Vazir' }}>
موجودی کافی نیست        </p>
      )}
    </List>
  );
}
