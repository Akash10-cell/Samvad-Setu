# Backend API Documentation

This document outlines the architecture, technology stack, and initial API routes for our backend service. It serves as the primary reference for frontend and backend developers integrating with the system.

## Architecture & Tech Stack

| Component         | Technology / Pattern            |
| ----------------- | ------------------------------- |
| **Architecture**  | MVC (Model - View - Controller) |
| **API Framework** | Express JS                      |
| **Database**      | MongoDB                         |

---

## API Routes

### Authentication Routes

**Base Path:** `/api/auth`

**File Location:** `controllers/authController.js` via `routes/authRoutes.js`

| Method   | Endpoint             | Access Level                       | Description                                                                              |
| -------- | -------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| **POST** | `/api/auth/register` | Public                             | Registers a new user. Valid roles: `citizen`, `hei`, `industry_csr`, `government_admin`. |
| **POST** | `/api/auth/login`    | Public                             | Authenticates a user. Returns a JWT and basic user profile information.                  |
| **GET**  | `/api/auth/me`       | Private _(Any authenticated user)_ | Retrieves the current logged-in user's profile data using their valid JWT.               |

### Problem Management Routes

**Base Path:** `/api/problems`

**File Location:** `controllers/problemController.js` via `routes/problemRoute.js`

| Method    | Endpoint                     | Access Level                           | Description                                                                                          |
| --------- | ---------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **GET**   | `/api/problems/public`       | Public                                 | Retrieves a static list of public problems. _(Currently a placeholder)_                              |
| **POST**  | `/api/problems`              | Private _(Citizen only)_               | Submits a new problem or report to the platform. _(Currently a placeholder, DB integration pending)_ |
| **POST**  | `/api/problems/:id/claim`    | Private _(HEI, HEI Admin)_             | Allows an institution to claim a specific problem for resolution. _(Currently a placeholder)_        |
| **PATCH** | `/api/problems/:id/moderate` | Private _(Govt Admin, Platform Admin)_ | Updates the lifecycle status of a reported problem. _(Currently a placeholder)_                      |
