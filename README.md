# 🗺️ Personnel Duty Map Dashboard

ระบบแดชบอร์ดจัดการข้อมูลกำลังพลและแผนที่ระบุพิกัดปฏิบัติงาน (Duty Map) พัฒนาด้วย React และเชื่อมต่อแผนที่แบบ Interactive ผ่าน Leaflet Map พร้อมการจัดการ State ด้วย Zustand

---

## 🌟 ฟีเจอร์หลัก (Key Features)

- **Personnel Directory:** แสดงรายชื่อกำลังพลทั้งหมดในระบบ
- **Interactive Map:** แผนที่แสดงจุดพิกัดปฏิบัติหน้าที่ สามารถคลิกเพื่อเลือกจุดพิกัดและเพิ่มสถานที่ใหม่ได้
- **Location Management:** แสดงรายชื่อสถานที่ปฏิบัติงาน และจัดการพิกัดผ่าน Modal กรอกข้อมูล
- **Zustand State Store:** จัดการสถานะและข้อมูลของแอปพลิเคชันอย่างเป็นระบบด้วย Global Store
- **Mock API Backend:** จำลองฐานข้อมูลและการเชื่อมต่อแบบ REST API ผ่าน JSON Server

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Map Library:** React-Leaflet & Leaflet
- **HTTP Client:** Axios
- **Mock Database:** JSON Server

---

## 🚀 ขั้นตอนการติดตั้งและรันโปรเจกต์ (Installation & Quick Start)

### 1. ติดตั้ง Dependencies
เปิด Terminal แล้วรันคำสั่งเพื่อติดตั้ง library ที่จำเป็น:
```bash
npm install
```

### 2. รัน Backend (JSON Server)
รัน Database จำลองบนพอร์ต `3000` (อ้างอิงจากไฟล์ `db.json`):
```bash
npm run server
```

### 3. รัน Frontend (React/Vite)
เปิด Terminal อีกหน้าต่างหนึ่ง แล้วรันเว็บแอปพลิเคชัน:
```bash
npm run dev
```

จากนั้นเปิดเว็บเบราว์เซอร์ไปที่ลิงก์ที่แสดงใน Terminal (ปกติจะเป็น `http://localhost:5173`)
