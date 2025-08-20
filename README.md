# Nama Project

## Deskripsi
Aplikasi ini merupakan [deskripsi singkat aplikasi, misal: sistem manajemen keluhan].  
Tujuannya adalah [jelaskan tujuan atau manfaat aplikasi secara singkat].

### Teknologi yang Digunakan
- **Frontend:** Next.js
- **Backend:** Node.js + Express
- **Database:** PostgreSQL  
- **Lainnya:** Tailwind CSS, ShadCN UI, Cloudinary, dll

---

## Instalasi & Menjalankan Aplikasi

### 1. Clone Repository
```bash
git clone https://github.com/Mochfahmi17/smart-complaint-management.git
cd smart-complaint-management
```

#### - Backend
```bash
cd backend
npm install
npm run dev
```

#### - Frontend
```bash
cd frontend
npm install
npm run dev
```

## Endpoints API (http://localhost:3001/api)
### Complaints
GET -> /complaints -> Ambil semua complaint
GET -> /complaints/{id} -> Ambil complaint berdasarkan id
GET -> /complaints/stats -> Ambil status sperti total complaint, total pending, total in progress dan total status done
POST -> /complaints/create -> Tambah complaint baru
PUT -> /complaints/update -> Update complaint
DELETE -> /complaints/delete/{id} -> hapus complaint

### categories
GET -> /categories Ambil semua kategori

## Sample Data
### Ambil semua data
{
    "success": true,
    "error": false,
    "data": [
        {
            "id": "cmejlcv730001i6fgqxaenpbw",
            "title": "Halaman Rumah Kotor",
            "description": "Saya menemukan banyak sampah di halaman depan rumah saya",
            "categoryId": "cmejic62b0003i6qgesx5rd0p",
            "status": "PENDING",
            "photoUrl": "https://res.cloudinary.com/dw6tyvzh0/image/upload/v1755682731/smartComplaintManagementcomplaintImage/zkgbnydhlszfvfmbuua8.jpg",
            "photo_public_id": "smartComplaintManagementcomplaintImage/zkgbnydhlszfvfmbuua8",
            "createdAt": "2025-08-20T06:28:11.211Z",
            "updatedAt": "2025-08-20T09:38:51.748Z",
            "category": {
                "id": "cmejic62b0003i6qgesx5rd0p",
                "name": "Kebersihan - Sampah, area kotor, maintance umum",
                "createdAt": "2025-08-20T05:03:40.502Z",
                "updatedAt": "2025-08-20T05:03:40.502Z"
            }
        },
        {
            "id": "cmejqylna0001i6b4uv1891no",
            "title": "Pipa Kamar Mandi Bocor",
            "description": "Pipa kamar mandi saya bocor sehingga banyak air masuk di ruang tamu saya",
            "categoryId": "cmejic62b0001i6qgjmyqqarl",
            "status": "PENDING",
            "photoUrl": "https://res.cloudinary.com/dw6tyvzh0/image/upload/v1755680704/smartComplaintManagementcomplaintImage/hnm2t6ylig9xbybir3g6.jpg",
            "photo_public_id": "smartComplaintManagementcomplaintImage/hnm2t6ylig9xbybir3g6",
            "createdAt": "2025-08-20T09:05:04.484Z",
            "updatedAt": "2025-08-20T09:05:04.484Z",
            "category": {
                "id": "cmejic62b0001i6qgjmyqqarl",
                "name": "Pipa/Air - Kebocoran, keran rusak, toilet bermasalah",
                "createdAt": "2025-08-20T05:03:40.502Z",
                "updatedAt": "2025-08-20T05:03:40.502Z"
            }
        }
    ]
}

### Ambil data berdasarkan Id
{
    "success": true,
    "error": false,
    "data": {
        "id": "cmejlcv730001i6fgqxaenpbw",
        "title": "Halaman Rumah Kotor",
        "description": "Saya menemukan banyak sampah di halaman depan rumah saya",
        "categoryId": "cmejic62b0003i6qgesx5rd0p",
        "status": "PENDING",
        "photoUrl": "https://res.cloudinary.com/dw6tyvzh0/image/upload/v1755682731/smartComplaintManagementcomplaintImage/zkgbnydhlszfvfmbuua8.jpg",
        "photo_public_id": "smartComplaintManagementcomplaintImage/zkgbnydhlszfvfmbuua8",
        "createdAt": "2025-08-20T06:28:11.211Z",
        "updatedAt": "2025-08-20T09:38:51.748Z",
        "category": {
            "id": "cmejic62b0003i6qgesx5rd0p",
            "name": "Kebersihan - Sampah, area kotor, maintance umum",
            "createdAt": "2025-08-20T05:03:40.502Z",
            "updatedAt": "2025-08-20T05:03:40.502Z"
        }
    }
}

### Ambil status complaint
{
    "success": true,
    "error": false,
    "data": {
        "totalCompliment": 2,
        "totalWaiting": 2,
        "totalInProgress": 0,
        "totalDone": 0
    }
}

### Ambil semua kategori
{
    "success": true,
    "error": false,
    "data": [
        {
            "id": "cmejic5rk0000i6qgk4ephuea",
            "name": "Listrik - Lampu mati, korsleting, stop kontak rusak",
            "createdAt": "2025-08-20T05:03:40.502Z",
            "updatedAt": "2025-08-20T05:03:40.502Z"
        },
        {
            "id": "cmejic62b0002i6qgw2ghnal2",
            "name": "Keamanan - CCTV, akses masuk, keamanan lingkungan",
            "createdAt": "2025-08-20T05:03:40.502Z",
            "updatedAt": "2025-08-20T05:03:40.502Z"
        },
        {
            "id": "cmejic62b0001i6qgjmyqqarl",
            "name": "Pipa/Air - Kebocoran, keran rusak, toilet bermasalah",
            "createdAt": "2025-08-20T05:03:40.502Z",
            "updatedAt": "2025-08-20T05:03:40.502Z"
        },
        {
            "id": "cmejic62b0003i6qgesx5rd0p",
            "name": "Kebersihan - Sampah, area kotor, maintance umum",
            "createdAt": "2025-08-20T05:03:40.502Z",
            "updatedAt": "2025-08-20T05:03:40.502Z"
        }
    ]
}
