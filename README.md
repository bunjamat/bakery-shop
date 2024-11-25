
# Bakery Shop

โปรเจกต์ Bakery Shop ประกอบด้วยส่วน Frontend และ Backend ซึ่งสามารถติดตั้งและรันได้ตามคำแนะนำด้านล่างนี้:

---

## เทคโนโลยีที่ใช้
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Bun Elysia](https://bun.sh/)

---

## การติดตั้งและการรัน

### **1. เตรียมสภาพแวดล้อม**
- ตรวจสอบว่าคุณติดตั้งเครื่องมือดังนี้แล้ว:
  - **Node.js** (แนะนำใช้เวอร์ชันล่าสุด)
  - **Bun** (ติดตั้งได้จาก [Bun.sh](https://bun.sh/))
  - **Git**

---

### **2. Clone โปรเจกต์**
ใช้คำสั่งนี้เพื่อ Clone โปรเจกต์จาก GitHub:
```bash
git clone https://github.com/bunjamat/bakery-shop.git
cd bakery-shop
```

---

### **3. ติดตั้ง Dependencies**
#### **Frontend**
เข้าไปที่โฟลเดอร์ `frontend` และติดตั้ง dependencies:
```bash
cd frontend
npm install
```

#### **Backend**
เข้าไปที่โฟลเดอร์ `backend` และติดตั้ง dependencies:
```bash
cd backend
bun install
```

---

### **4. การรันโปรเจกต์**
#### **Frontend**
รันเซิร์ฟเวอร์ Next.js:
```bash
npm run dev
```
- เปิดเบราว์เซอร์และเข้าที่ [http://localhost:3000](http://localhost:3000)

#### **Backend**
รันเซิร์ฟเวอร์ Bun Elysia:
```bash
bun run dev
```
- API จะพร้อมใช้งานที่ [http://localhost:4000](http://localhost:4000)

---

## โครงสร้างโปรเจกต์
```plaintext
bakery-shop/
│
├── frontend/       # โค้ดสำหรับส่วน Frontend (Next.js)
├── backend/        # โค้ดสำหรับส่วน Backend (Bun Elysia)
└── README.md       # ไฟล์เอกสารนี้
```

---

## หมายเหตุ
- หากพบปัญหาในการติดตั้งหรือรันโปรเจกต์ กรุณาตรวจสอบว่าเวอร์ชันของ Node.js หรือ Bun ตรงกับที่แนะนำ
- สำหรับการพัฒนาเพิ่มเติม คุณสามารถปรับแต่งโค้ดใน `frontend` และ `backend` ตามความต้องการ

---

## ผู้พัฒนา
- **Bird** ([GitHub](https://github.com/bunjamat))
