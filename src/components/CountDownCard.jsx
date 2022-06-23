import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect } from "react";
import { useState } from "react";

function CountDownCard() {
  dayjs.extend(duration);
  //Duration Plugin not working => Getting Duration convertion value NaN
  //Converting Date from form value to ISOString not working in react hence using dayjs to convert
  const Time = new Date().getTime();
  console.log(Time);

  const CurrentDate = () => {
    return Date.parse(dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
  };

  console.log("Current Date", CurrentDate);
  const [EndDate, setEndDate] = useState(null);
  const [CountDown, SetCountDown] = useState(null);

  useEffect(() => {
    const DateDifference = EndDate - CurrentDate;
    if (DateDifference > 0) {
      SetCountDown(DateDifference);
    } else {
      SetCountDown(0);
    }
  }, [EndDate]);

  // setInterval(function () {
  //   SetCountDown();
  // }, 1000);

  return (
    <div className="card">
      <div className="m-3">
        <label htmlFor="End Date">End Date</label>
        <input
          className="form-control"
          type="datetime-local"
          onChange={(e) =>
            setEndDate(
              Date.parse(
                dayjs(e.target.value).format("YYYY-MM-DDTHH:mm:ss.sssZ")
              )
            )
          }
        />
      </div>
      <br></br>
      <h3>
        Offer Ends in{" "}
        {CountDown &&
          dayjs.duration(CountDown).days() +
            " Days " +
            dayjs.duration(CountDown).minutes() +
            " Minutes " +
            dayjs.duration(CountDown).seconds() +
            " Seconds "}
      </h3>
    </div>
  );
}

export default CountDownCard;
