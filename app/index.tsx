import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  //หน่วงหน้าจอ 3 วินาที
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* แสดงรูปกาแฟ */}
      <Image
        source={require("@/assets/images/coffeeshop.png")}
        style={styles.imgSty}
      />

      {/* ชื่อแอป */}
      <Text style={styles.txtSty1}>TOP BKK COFFEE</Text>

      {/* ข้อความทั่วไป */}
      <Text style={styles.txtSty2}>ที่สุดของร้านกาแฟในกรุงเทพฯ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  txtSty1: {
    fontFamily: "Kanit_700Bold",
    fontSize: 30,
    marginTop: 20,
    color: "#4f1c02",
  },
  txtSty2: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    marginTop: 8,
    color: "#6D4C41",
  },
  imgSty: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
