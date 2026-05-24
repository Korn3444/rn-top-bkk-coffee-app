import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../services/supabase";
import { CoffeeShop } from "../types";

export default function Home() {
  const router = useRouter();

  //สร้าง State เพื่อเก็บข้อมูลที่ดึงมาจาก Supabase
  //และนำไปใช้กับ Component ที่จะเอาข้อมูลไปแสดงบนหน้าจอ
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const [loading, setLoading] = useState(true);

  //พอหน้าจอ Render แล้ว ให้ดึงข้อมูลจาก Supabase
  useEffect(() => {
    //ดึงข้อมูลจาก Supabase และนำไปเก็บใน State -> shops
    //สร้างเป็นฟังชั่นดึง
    const fetchShops = async () => {
      //ดึงจาก supabase
      const { data, error } = await supabase
        .from("coffee_shops_tb")
        .select("*")
        .order("name", { ascending: true });
      //หลังจากดึง ตรวจสอบว่ามี error ไหม
      if (error) {
        Alert.alert("คำเตือน", "พบปัญหาในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
        return;
      }

      //ถ้าไม่มี error ให้นำข้อมูลที่ดึงไปเก็บใน State -> shops
      setShops(data as CoffeeShop[]);
      setLoading(false);
    };

    //เรียกฟังก์ชั่นดึงให้ทำงาน
    fetchShops();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f1c02" />
        <Text style={styles.loadingText}>กำลังโหลดร้านกาแฟ...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shops}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() =>
            router.push({ pathname: "/detail", params: { id: item.id } })
          }
        >
          <Image
            source={{ uri: item.image_url }}
            style={styles.thumb}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.district} numberOfLines={1}>
              📍 {item.district}
            </Text>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>ยังไม่มีร้านในระบบ</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#6D4C41",
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
  },
  emptyText: {
    color: "#6D4C41",
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
  },
  list: { padding: 16, paddingBottom: 32 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardPressed: { opacity: 0.7 },
  thumb: { width: 110, height: 110, backgroundColor: "#EFEBE9" },
  info: { flex: 1, padding: 12, justifyContent: "center" },
  name: {
    fontSize: 17,
    fontFamily: "Kanit_700Bold",
    color: "#3E2723",
    marginBottom: 6,
  },
  district: {
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#6D4C41",
  },
});
