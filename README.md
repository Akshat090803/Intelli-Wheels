# Intelli Wheels 🚘

**AI-Powered Car Marketplace**  
Intelli Wheels is a sophisticated full-stack web application that redefines the car buying and selling experience through intelligent AI enhancements and a user-friendly interface. Initially developed to power the operations of "Evergreen Motors," this project is designed with future scalability in mind to accommodate multiple dealerships.


---

## 🔍 Overview

**Intelli Wheels** is an AI-driven car marketplace platform currently tailored for a single dealership (**Evergreen Motors**), with future-ready scalability to support multiple dealerships.

Users can:
- Search and filter cars using advanced criteria
- Upload a car image to get AI-powered car matches
- Wishlist cars
- Book test drives
- Calculate EMI
- View detailed car pages

Admins can:
- Add new cars manually or via AI image upload
- Manage car listings (status updates, deletions, etc.)
- Handle test drive bookings
- Set dealership working hours and manage staff
- Access real-time dealership analytics and dashboards

---

## 🚀 Features

### ✅ User-Side
- 🔍 **AI Car Search** (by uploading an image)
- 🛒 Wishlist cars
- 📅 Test drive booking
- 🧮 EMI calculation
- 🔧 Advanced filters (brand, price range, body type, fuel, transmission)
- ↕️ Sorting (price low-high, high-low, newest)
- 📄 Car detail pages
- 📑 Pagination
- 🧲 Drag-and-drop image upload support (Dropbox-style)

### ⚙️ Admin Dashboard
- ➕ Add car (manual or AI image-based form autofill)
- 🛠 Manage car listings (status change, delete, mark sold)
- 📋 View & manage test drive requests
- 🕒 Schedule dealership timings
- 👥 Manage admins (create/remove)
- 📊 Dealership overview & analytics

---

## 🛠️ Technologies Used

* **Frontend:**
    * [**Next.js**](https://nextjs.org/) - React framework for production.
    * [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
    * [**Shadcn UI**](https://ui.shadcn.com/) - Reusable UI components.
* **Backend & Data Layer:**
    * **Next.js Server Actions** - For efficient and secure server-side logic and mutations.
    * [**Supabase (PostgreSQL)**](https://supabase.com/) - Open-source Firebase alternative, providing a powerful PostgreSQL database.
    * [**Prisma**](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
* **Authentication:**
    * [**Clerk**](https://clerk.com/) - Complete user management solution.
* **Security:**
    * [**Arcjet**](https://arcjet.com/) - For robust rate limiting to protect against abuse.
* **AI Integration:**
    * **Google Gemini API** - For AI-powered features like image analysis.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed and accounts set up:

* Node.js (LTS version recommended)
* npm or Yarn
* A [Supabase](https://supabase.com/) project
* A [Clerk](https://clerk.com/) account
* An [Arcjet](https://arcjet.com/) account
* A [Google Cloud](https://cloud.google.com/gemini-api) project with access to the Gemini API

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Akshat090803/Intelli-Wheels.git](https://github.com/Akshat090803/Intelli-Wheels.git)
    cd Intelli-Wheels
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Set up environment variables:**
    Create a file named `.env.local` in the root directory of the project and populate it with the following variables. Replace the placeholder values with your actual keys and URLs.

    ```
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

    # Supabase Database
    DATABASE_URL="your_supabase_postgres_connection_string"
    NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

    # AI Integration (Gemini)
    GEMINI_API_KEY="your_google_gemini_api_key"

    # Rate Limiting
    ARCJET_KEY="your_arcjet_api_key"
    ```
    * **Clerk Keys/URLs:** Find these in your [Clerk Dashboard](https://dashboard.clerk.com/).
    * **Supabase URLs/Keys:** Locate your project URL, anonymous public key, and database connection string in your [Supabase Project Settings](https://app.supabase.com/).
    * **Gemini API Key:** Obtain this from your [Google Cloud Console](https://console.cloud.google.com/) after enabling the Gemini API.
    * **Arcjet Key:** Your API key is available in your [Arcjet Dashboard](https://app.arcjet.com/).

4.  **Push Prisma schema and generate client:**
    ```bash
    npx prisma db push
    npx prisma generate
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

