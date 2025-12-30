# DigiGrow - Local Digital Agency Website 🚀

DigiGrow is a modern, high-performance website designed for local digital marketing agencies in India. It helps small businesses grow their online presence with affordable services like Website Development, Google Reviews, and Social Media Marketing.

## ✨ Features

- **Dynamic Content Management:** Fully dynamic website powered by Supabase.
- **Admin Dashboard:** Secure admin panel to manage:
  - **Leads:** Track and manage enquiries.
  - **Portfolio:** Add/Edit/Delete real client projects.
  - **Testimonials:** Manage client reviews with ratings and phone numbers.
  - **Services:** Update service offerings and pricing.
  - **Links:** Manage navigation and social media links.
- **Responsive Design:** Mobile-first approach using Tailwind CSS.
- **SEO Optimized:** Built with React Helmet Async for local SEO (Boisar, Palghar).
- **Direct WhatsApp Integration:** Floating WhatsApp button for instant lead generation.
- **Performance:** Fast loading with Vite and React.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend/Database:** Supabase (PostgreSQL)
- **State Management:** TanStack Query
- **Routing:** React Router DOM
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashpawar9274/digigrow.git
   cd digigrow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup (Supabase)

Run the SQL migration scripts located in `supabase/migrations` and individual SQL files in the `supabase/` folder to set up the tables:
- `leads`
- `services`
- `testimonials`
- `portfolio`
- `links`
- `site_settings`

## 📱 Pages

- **Home:** `/`
- **Services:** `/services`
- **Portfolio:** `/portfolio`
- **Pricing:** `/pricing`
- **Contact:** `/contact`
- **Admin Login:** `/admin`
- **Admin Dashboard:** `/admin/dashboard`

## 🤝 Contact

**DigiGrow** - Helping Local Businesses Grow.
- **Location:** Boisar, Palghar, Maharashtra
- **Email:** contact@digigrow.in

---
Built with ❤️ for Local Businesses.
