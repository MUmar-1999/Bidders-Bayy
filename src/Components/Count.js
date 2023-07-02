import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Count({ time, style, style2, onExpired }) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    let newDate = new Date(time);
    const expiry = newDate.setDate(newDate.getDate() + 7);
    // console.log(`Expiry: ${expiry}`);
    const today = new Date();
    const diffInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (diffInDays <= 0 && onExpired) {
      onExpired(true)
    }
    setDays(diffInDays);
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {days <= 0 ? (
        <Text style={style}>Expired</Text>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="clock-outline"
            style={style2}
          />
          <Text style={style}>
            {" "}
            {days} {days === 1 ? "day" : "days"}
          </Text>
        </View>
      )}
    </View>
  );
}

