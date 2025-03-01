# E-Commerce Frontend BG-task

## Overview

This project is a modern, responsive e-commerce frontend application built with Next.js 15, TypeScript, and Tailwind CSS. It features a complete shopping experience with product browsing, cart management, checkout process, user authentication, and profile management.

The application demonstrates best practices in React development including:

- Component-based architecture
- Custom hooks for state management
- Responsive design
- Animations and transitions
- Form validation
- Local storage for persistent data

## Features

- **Product Catalog**

  - Browse products by categories
  - View detailed product information
  - Responsive product grid layout

- **Shopping Cart**

  - Add/remove products
  - Update quantities
  - Drag and reorder items
  - Persistent cart data

- **Checkout Process**

  - Multi-step form with validation
  - Order summary
  - Shipping calculation
  - Order confirmation

- **User Authentication**

  - Registration with validation
  - Login/logout functionality
  - Protected routes

- **User Profile**

  - View and edit personal information
  - Order history
  - Account settings

- **UI/UX**
  - Smooth animations with Framer Motion
  - Loading states and indicators
  - Responsive design for all devices
  - Toast notifications

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Form Handling**: Custom validation
- **Data Persistence**: Local Storage
- **Notifications**: React Hot Toast

## Project Structure

```
frontend-beshara-task/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── order-success/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useCheckout.ts
│   │   ├── useContactForm.ts
│   └── services/
│       └── categories.ts
└── package.json

```

## Custom Hooks

The project uses several custom hooks to manage state and logic:

- **useCart**: Manages cart state, including adding/removing items and calculating totals
- **useCheckout**: Handles checkout form state, validation, and order processing
- **useContactForm**: Manages contact form state and submission
- **useLocalStorage**: Provides a persistent state using localStorage with debouncing

## UI Components

The application includes reusable UI components:

- **AnimatedHeader**: Animated page headers with gradient text
- **LoadingSpinner**: Loading indicator with animated dots
- **OptimizedImage**: Image component with lazy loading and blur-up effect
- **PageTransition**: Wrapper for page transition animations

## Authentication Flow

1. User registers with validated form data
2. User logs in with credentials
3. Authentication state is stored in localStorage
4. Protected routes check for authentication
5. User can log out, clearing authentication state

## Shopping Flow

1. User browses products by category
2. User adds products to cart
3. Cart is updated and persisted in localStorage
4. User proceeds to checkout
5. User fills shipping and payment information
6. Order is processed and confirmation is shown
7. Cart is cleared and order is saved

## Responsive Design

The application is fully responsive with tailored layouts for:

- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## Performance Optimizations

- Code splitting with dynamic imports
- Image optimization with Next.js Image component
- Memoization of components with React.memo
- Optimized animations with Framer Motion

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmed-kkamel/frontend-beshara-task.git
cd frontend-beshara-task
```

2. install the repository locally:

```bash
npm install
# or
yarn install
```

3. Run the project:

```bash
npm run dev
# or
yarn dev
```

## Testing

The application can be tested manually by following these steps:

1. Register a new user account
2. Log in with the created account
3. Browse products and add them to cart
4. Proceed to checkout and complete the order
5. View order confirmation and check profile for order history

## Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture for reusability
- Custom hooks for separation of concerns
