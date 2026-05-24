import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../services/supabase";
import { CoffeeShop } from "../types";

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [shop, setShop] = useState<CoffeeShop | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("coffee_shops_tb")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        setShop(data as CoffeeShop);
      }
      setLoading(false);
    })();
  }, [id]);

  const onCall = () => {
    if (!shop?.phone) return;
    const tel = `tel:${shop.phone.replace(/[^0-9+]/g, "")}`;
    Linking.openURL(tel).catch(() => {});
  };

  const onOpenMap = () => {
    if (!shop) return;
    const { latitude, longitude, name } = shop;
    const label = encodeURIComponent(name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    })!;
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      );
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3E2723" />
      </View>
    );
  }

  if (errorMsg || !shop) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {errorMsg ?? "ไม่พบข้อมูลร้านกาแฟ"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image
        source={{ uri: shop.image_url }}
        style={styles.hero}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.body}>
        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.district}>{shop.district}</Text>
        <Text style={styles.desc}>{shop.description}</Text>

        <Pressable
          style={({ pressed }) => [styles.callBtn, pressed && { opacity: 0.85 }]}
          onPress={onCall}
        >
          <Text style={styles.callText}>📞 โทร: {shop.phone}</Text>
        </Pressable>

        <Text style={styles.mapLabel}>แผนที่ร้าน:</Text>
        <Pressable onPress={onOpenMap} style={styles.mapWrap}>
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <MapView
              style={StyleSheet.absoluteFill}
              initialRegion={{
                latitude: shop.latitude,
                longitude: shop.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={{
                  latitude: shop.latitude,
                  longitude: shop.longitude,
                }}
                title={shop.name}
                description={shop.district}
              />
            </MapView>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFF8E1",
  },
  errorText: { color: "#B00020", fontSize: 14, textAlign: "center" },
  content: { paddingBottom: 32 },
  hero: { width: "100%", height: 240, backgroundColor: "#EFEBE9" },
  body: { padding: 20 },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3E2723",
    marginBottom: 4,
  },
  district: { fontSize: 14, color: "#6D4C41", marginBottom: 14 },
  desc: {
    fontSize: 15,
    color: "#3E2723",
    lineHeight: 22,
    marginBottom: 20,
  },
  callBtn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  callText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  mapLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3E2723",
    marginBottom: 8,
  },
  mapWrap: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#EFEBE9",
  },
});
