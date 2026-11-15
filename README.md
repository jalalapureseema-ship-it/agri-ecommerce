# AgriMart

AgriMart is a responsive agriculture marketplace built with React, Vite, React Router, and CSS. It includes separate farmer and customer experiences, a categorized sample catalog, product listings, a persistent cart, checkout, order tracking, and contact forms.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Create a farmer or customer account in the app to try the dashboards and workflows; there are no shared demo passwords.

## Validation

```sh
npm run lint
npm run build
```

## Current data and service limits

This version is a frontend-only prototype. Accounts, product listings, cart contents, orders, and contact messages are saved in the current browser's `localStorage`; they are not shared across browsers or devices. Account passwords are stored locally in plain text, so this storage is not suitable for real accounts or sensitive data. The mobile OTP flow is a local demonstration and does not send SMS. Online payments and a support mailbox are not connected; checkout is limited to cash on delivery, and contact messages remain in the browser.

The built-in products are sample catalog data. Farmer-uploaded images are resized in the browser and stored with their listing, so a production deployment should use a proper image-storage service.

## Public deployment

The Vercel rewrite in `vercel.json` sends deep links to the React app so BrowserRouter routes work on refresh. Deploy the repository as a Vite project with the default build command `npm run build` and output directory `dist`.

A public deployment of the current frontend is suitable for trying the interface, not for operating a real multi-user marketplace. Before handling real customers, orders, passwords, or payments, connect a server/API and database, secure server-side authentication and authorization, persistent image storage, an email/SMS provider, and a payment provider if online payments are required. No backend URL, database URI, provider credentials, or API keys were supplied, so none are included or simulated as live services.
