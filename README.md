# ☕ Top Bangkok Coffees

> ค้นพบที่สุดของร้านกาแฟในกรุงเทพฯ — แอปพลิเคชันบนมือถือที่รวบรวมร้านกาแฟยอดนิยม พร้อมรายละเอียด แผนที่ และเบอร์ติดต่อ

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-2.x-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

---

## 🎬 Preview

<div align="center">
  <video src="https://github.com/user-attachments/assets/e04ae297-31b1-4486-9e1c-81ed0e5aac34" controls width="320"></video>
</div>

---

## ✨ Features

- 🎨 **Splash Screen สวยงาม** — แสดงโลโก้ 3 วินาที พร้อม fade ไปหน้าหลักอัตโนมัติ
- 📋 **รายการร้านกาแฟ** — ดึงข้อมูลจาก Supabase แบบ real-time แสดงเป็น Card UI
- 🏠 **หน้ารายละเอียด** — รูปภาพ, คำอธิบาย, เขตที่ตั้ง
- 📞 **โทรหาร้านได้ทันที** — กดปุ่มเดียวเปิด dialer
- 🗺️ **แผนที่ปักหมุด** — ใช้ `react-native-maps` แสดงตำแหน่ง พร้อมเปิด Google Maps / Apple Maps
- 🅰️ **Font Kanit** — ตัวอักษรไทยสวยงามทั้งแอป

---

## 📱 Screenshots

<p align="center">
  <table align="center">
    <tr>
      <td align="center"><b>Splash Screen</b></td>
      <td align="center"><b>หน้ารายการร้าน</b></td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/user-attachments/assets/9615031a-90ca-4f15-b517-6f2023108d66" width="240" /></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/534a8ec8-03ce-4230-9bb5-e089ea9cf0df" width="240" /></td>
    </tr>
    <tr>
      <td align="center"><b>รายละเอียดร้าน</b></td>
      <td align="center"><b>แผนที่ร้าน</b></td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/user-attachments/assets/0ee3a64b-181b-461e-96f5-195147ae3a6b" width="240" /></td>
      <td align="center"><img src="https://github.com/user-attachments/assets/db379b6e-3304-49b8-92e7-5594f9018c56" width="240" /></td>
    </tr>
  </table>
</p>

---

## 🛠️ Tech Stack

| หมวด | เทคโนโลยี |
|---|---|
| **Framework** | React Native 0.81 + Expo 54 |
| **Language** | TypeScript 5.9 |
| **Routing** | Expo Router (file-based) |
| **Backend** | Supabase (PostgreSQL + Storage + RLS) |
| **Map** | react-native-maps |
| **Font** | Kanit (Google Fonts) |
| **Image** | expo-image |

---

## 📂 Project Structure

```
rn-top-bkk-coffee-app/
├── app/
│   ├── _layout.tsx        # Root Stack + Font loader + SplashScreen
│   ├── index.tsx          # Splash screen (3s → /home)
│   ├── home.tsx           # Coffee shop list (FlatList)
│   └── detail.tsx         # Detail + Map + Phone
├── services/
│   └── supabase.ts        # Supabase client config
├── assets/
│   └── images/
│       └── coffeeshop.png # App logo
├── types.ts               # CoffeeShop type
└── package.json
```

---

## 🗄️ Database Schema

ตาราง `coffee_shops_tb` บน Supabase:

| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | ชื่อร้าน |
| `district` | text | เขต/ย่าน |
| `description` | text | รายละเอียด |
| `image_url` | text | URL รูปภาพ (จาก Storage bucket `coffee_shops_bk`) |
| `phone` | text | เบอร์โทร |
| `latitude` | float8 | ละติจูด |
| `longitude` | float8 | ลองจิจูด |

---

## 🚀 Getting Started

### 1️⃣ Clone repository

```bash
git clone https://github.com/chanathip66/rn-top-bkk-coffee-app.git
cd rn-top-bkk-coffee-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ ตั้งค่า Supabase

แก้ไฟล์ `services/supabase.ts` ใส่ค่า Project URL และ anon key ของคุณ:

```ts
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
```

### 4️⃣ Run

```bash
npx expo start
```

แล้วสแกน QR ด้วยแอป **Expo Go** บนมือถือ

---


---

## 👨‍💻 Author

**Chanathip Chueycherm**
Student ID: `6852D10005`

> โปรเจกต์นี้เป็นส่วนหนึ่งของรายวิชา การพัฒนาโปรแกรมประยุกต์ สำหรับอุปกร์เคลื่อนที่

---

<p align="center">
  Made with ☕ in Bangkok
</p>
