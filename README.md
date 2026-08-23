<div align="center">

# ✂️ bg-remover

### Drop an image in. Watch the background disappear.

*A full-stack app that erases backgrounds in seconds — powered by AI, guarded by auth, fueled by credits.*

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](#-tech-stack)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](#-tech-stack)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](#-tech-stack)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?logo=mongodb&logoColor=white)](#-tech-stack)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](#-tech-stack)

</div>

---

## 🪄 What it does

Upload a photo → **ClipDrop's AI** strips the background → you get back a clean, transparent PNG. That's the whole trick, wrapped in a product:

- 🔐 **Sign in with Clerk** — no password to manage, no account to build
- 💳 **Credit-based usage** — every removal costs 1 credit, top up via **Razorpay**
- 🖼️ **Before/after slider** — drag to compare the original against the result
- ⬇️ **One-click download** of the finished image
- ⚡ **Instant feedback** — toasts, loading states, and a result page that just works

---

## 🧭 How a request flows

```
   ┌──────────┐        ┌───────────┐        ┌──────────────┐        ┌───────────┐
   │  Browser │ ──────▶│  Express  │ ──────▶│  ClipDrop AI  │ ──────▶│  Response │
   │  (React) │  image │   API     │  image │  Remove BG    │  PNG   │  base64   │
   └──────────┘        └─────┬─────┘        └──────────────┘        └───────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              ┌─────▼─────┐      ┌──────▼──────┐
              │  Clerk    │      │  MongoDB    │
              │  (auth)   │      │  (credits)  │
              └───────────┘      └─────────────┘
```

Every `/api/image/remove-bg` call is gated behind Clerk auth, checked against the user's credit balance in MongoDB, forwarded to ClipDrop, then billed — one credit per successful removal.

---

## 🏗️ Tech stack

| Layer | Stack |
|---|---|
| **Frontend** | React 19 · Vite · Tailwind CSS 4 · React Router 7 |
| **Auth** | Clerk (`@clerk/clerk-react`) |
| **Backend** | Node.js · Express 5 · Mongoose |
| **Database** | MongoDB Atlas |
| **AI engine** | ClipDrop Remove Background API |
| **Payments** | Razorpay |
| **File handling** | Multer |
| **Deployment** | Vercel (client + server) |

---

## 📁 Project layout

```
bg-remover/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Navbar, Header, Upload, BgSlider, Steps, Testimonials, Footer
│       ├── context/        # AppContext — credits, auth, image state
│       ├── pages/          # Home, Result, BuyCredit
│       └── assets/         # icons, illustrations, sample images
│
└── server/                 # Express API
    ├── configs/            # MongoDB connection
    ├── controllers/        # image + user + payment logic
    ├── middlewares/        # Clerk auth guard, Multer upload
    ├── models/             # User, Transaction schemas
    └── routes/             # /api/image, /api/user
```

---

## 🚀 Getting started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd bg-remover

cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

**`server/.env`**
```env
MONGODB_URI=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

**`client/.env`**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> ⚠️ **Keep these out of version control.** Rotate any key that's ever been committed.

### 3. Run it

```bash
# terminal 1 — backend
cd server && npm run server

# terminal 2 — frontend
cd client && npm run dev
```

The app boots at `http://localhost:5173`, talking to the API at `http://localhost:4000`.

---

## 🔌 API surface

| Method | Endpoint | Auth | Purpose |
|---|---|:---:|---|
| `POST` | `/api/user/webhooks` | — | Clerk user sync (create/update/delete) |
| `GET` | `/api/user/credits` | ✅ | Fetch current credit balance |
| `POST` | `/api/user/pay-razor` | ✅ | Create a Razorpay order |
| `POST` | `/api/user/verify-razor` | ✅ | Verify payment & top up credits |
| `POST` | `/api/image/remove-bg` | ✅ | Upload an image, get it back background-free |

---

## 💡 Why it's built this way

- **Credits, not subscriptions** — casual users pay for what they use; new sign-ups start with free credits to try it out.
- **Clerk webhooks** keep the local `User` collection in sync automatically — no manual account management.
- **ClipDrop** does the heavy lifting on AI, so the app stays lightweight and fast to ship.

---

<div align="center">

**Built with React, Express, and a healthy respect for transparent PNGs.**

</div>
