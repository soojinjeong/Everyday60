# Everyday60 🍰✨  
A modern web-based reservation and customer engagement platform for **Bistro 60** and **Bakery 60** in Prague.

## 🌟 About
Everyday60 is a full-stack web application that allows users to:
- Make reservations at Bistro 60
- Receive confirmation or rejection emails
- Explore seasonal menus, loyalty programs, and more
- Interact with a custom chatbot interface
- Enjoy a dynamic, mobile-responsive experience

This system also includes admin-side Google Sheets integration to manage and approve reservations with automatic email responses.

---

## 🔧 Features

### 🧑‍🍳 For Customers:
- Responsive reservation form with validations:
  - No past dates
  - Closed on Mondays
  - Limited hours on Sundays (09:00–17:00)
- Dynamic seasonal menu loader
- Custom chatbot with scrollable interaction
- Loyalty program details and instructional video
- Image hover effects (desktop only)
- Experience-sharing Google Form

### 🧑‍💼 For Staff/Admins:
- Reservation data is saved directly into Google Sheets via Google Sheets API
- Approving/rejecting a reservation triggers automatic email via Google Apps Script
- Decline emails include WhatsApp contact link for convenience

---

## 🛠 Tech Stack

**Frontend:**
- HTML, CSS, JavaScript
- Dynamic component loading (`fetch` API)
- Chat UI and overlay navigation
- Responsive and mobile-optimized layout

**Backend:**
- Node.js with Express
- Google Sheets API via `googleapis`
- JSON-based reservation POST handling
- CORS and body-parser middleware

**Google Apps Script:**
- Email automation based on spreadsheet updates
- Logic for reservation approval or rejection

---

## 🚀 How to Run Locally

### 1. Clone this repo
```bash
git clone https://github.com/soojinjeong/Everyday60.git
cd Everyday60
