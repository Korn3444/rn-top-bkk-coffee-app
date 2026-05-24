// ไฟล์นี้ใช้สำหรับสร้างชนิดข้อมูลใหม่ที่ล้อกับตารางที่ DB ที่เราจะทำงานด้วย

export type CoffeeShop = {
  id: string;
  name: string;
  district: string;
  description: string;
  image_url: string;
  phone: string;
  latitude: number;
  longitude: number;
};
