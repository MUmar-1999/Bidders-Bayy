import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Count(props) {
  const [days, setDays] = useState(-1);

  useEffect(() => {
    const newDate = new Date(props.time);
    console.log("new date", newDate);
    const x = dataChanger(newDate);
    console.log("The value of ex", x);
    const y = addDays(x, 7);
    console.log("thel value of why", y);
    let u = new Date();
    u = dataChanger(u);
    const z = calculateDaysDifference(u, y);
    console.log(x);
    console.log(y);
    console.log(z);

    if (isNaN(z) || z < 0) {
      setDays(0);
    } else {
      setDays(z);
    }
  }, []);

  const addDays = (dateString, days) => {
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const year = parseInt(dateParts[2], 10) + 2000; // Assuming 'YY' represents 20YY

    const currentDate = new Date(year, month, day);
    const futureDate = new Date(
      currentDate.getTime() + days * 24 * 60 * 60 * 1000
    );

    const futureDay = futureDate.getDate();
    const futureMonth = futureDate.getMonth() + 1; // Adding 1 since months are zero-based
    const futureYear = futureDate.getFullYear() - 2000; // Subtracting 2000 to get 'YY' format

    return `${futureDay}/${futureMonth}/${futureYear}`;
  };

  const dataChanger = (newDate) => {
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const [startDay, startMonth, startYear] = startDate.split("/").map(Number);
    const [endDay, endMonth, endYear] = endDate.split("/").map(Number);
    const startDateObj = new Date(`20${startYear}`, startMonth - 1, startDay);
    const endDateObj = new Date(`20${endYear}`, endMonth - 1, endDay);
    const diffInDays = Math.round(
      Math.abs((startDateObj - endDateObj) / oneDay)
    );
    return diffInDays;
  };

  return (
    <View>
      {days <= 0 ? (
        <Text>Post has expired</Text>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
              width: "100%",
              paddingVertical: 5,
            }}
          >
            {days} {days === 1 ? "day" : "days"}
          </Text>
        </View>
      )}
    </View>
  );
}
