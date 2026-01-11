# Software Requirements Specification (SRS) — JugaadPay Backend

Version: 1.0
Date: 2025-08-11

1. Introduction
- Purpose: Define functional and non-functional requirements for the JugaadPay Backend API implemented with Node.js/Express and Sequelize.
- Scope: Authentication, user profile, persons management, transactions (sent/received), and transaction payees. All data is scoped per authenticated user.

2. System Overview
- Tech stack: Node.js (Express), Sequelize ORM, Zod for validation, JWT for auth, CORS, Helmet.
- API style: JSON over HTTP, REST-style routes, pagination and filtering supported on list endpoints.
- Security: JWT-based authentication, per-user data isolation enforced by services/controllers.

3. Stakeholders and User Classes
- End-users of the mobile/web client (authenticated users)
- Backend developers and maintainers

4. Functional Requirements
4.1 Authentication
- FR-A1 Send OTP to email for signup
  - Endpoint: POST /auth/send-otp
  - Body: { email }
  - Behavior: Generates and emails OTP for signup verification.
- FR-A2 Signup with email/password/OTP
  - Endpoint: POST /auth/signup
  - Body: validated by schemas/auth.schemas/signup.auth.schema
  - Behavior: Verifies OTP, hashes password, creates user, returns JWT.
- FR-A3 Login with email/password
  - Endpoint: POST /auth/login
  - Body: validated by schemas/auth.schemas/login.auth.schema
  - Behavior: Validates credentials, returns JWT.

4.2 User Profile
- FR-U1 Get current user profile
  - Endpoint: GET /users/user/profile (JWT required)
  - Behavior: Returns profile for req.user.id via service get_profile.user.service.
- FR-U2 Update current user profile
  - Endpoint: PUT /users/user/profile (JWT required)
  - Body: validated by schemas/user.schemas/update_user.user.schema
  - Behavior: Updates allowed fields, returns updated user.

4.3 Persons Management
- FR-P1 Create person
  - Endpoint: Mounted under /persons (JWT required)
  - Body: validated by schemas/person.schemas.js/create.person.schema
  - Behavior: Creates a person for the current user.
- FR-P2 Update person
  - Endpoint: PUT /persons/:id (JWT required)
  - Body: validated by schemas/person.schemas.js/update.person.schema
  - Behavior: Updates a person owned by the user.
- FR-P3 Get person by id
  - Endpoint: GET /persons/:id (JWT required)
  - Behavior: Returns a person owned by the user or 404.
- FR-P4 List persons (paginated + filters)
  - Endpoint: e.g., GET /persons (JWT required, see person.routes)
  - Query filters supported: name (full name), mobile, email
  - Behavior: Limit=50/page, returns persons, totalCount, pages.
  - Notes: name is treated as full_name and applied to CONCAT(first_name, ' ', last_name) with case-insensitive LIKE.

4.4 Transactions
- FR-T1 Create Sent transaction
  - Endpoint: POST /transactions/transactions/sent (JWT required)
  - Body: validated by schemas/transaction.schemas/sent_create.transaction.schema
- FR-T2 Create Received transaction
  - Endpoint: POST /transactions/transactions/received (JWT required)
  - Body: validated by schemas/transaction.schemas/received_create.transaction.schema
- FR-T3 List transactions (paginated + filters)
  - Endpoint: GET /transactions/transactions (JWT required)
  - Query params: page, from, to, type (string or comma-separated list)
  - Behavior: Filters by datetime (from/to range) and type ∈ {Sent, Received}; returns transactions, totalCount, pages; page size 50.
- FR-T4 Get transaction by id
  - Endpoint: GET /transactions/transactions/:id (JWT required)
  - Behavior: Returns a transaction owned by the user or 404.

4.5 Transaction Payees
- FR-TP1 Get payees for a transaction
  - Endpoint: GET /transaction-payees/transactions/:transactionId/payees (JWT required)
  - Behavior: Returns all payees linked to the given transactionId for the user.

4.6 Password Management
- FR-PW1 Send OTP for password reset
  - Endpoints:
    - POST /auth/reset-password/send-otp
  - Behavior: Sends an OTP to the provided email for resetting password.
- FR-PW2 Reset password with OTP
  - Endpoints:
    - POST /auth/reset-password
  - Body: { email, otp, newPassword }
  - Behavior: Verifies OTP and updates password.
- FR-PW3 Change password (authenticated)
  - Endpoints:
    - POST /auth/change-password
  - Body: { oldPassword, newPassword }
  - Behavior: Verifies old password and updates to new password.

5. Data Model (Logical)
- Users: id, email, password (hashed), profile fields (first_name, last_name, mobile, etc.).
- Persons: id, user_id (FK), first_name, last_name, mobile, email, etc.
- Transactions (models/Transactions.js):
  - id (PK), amount (DECIMAL 10,2), datetime (DATE), description (TEXT), type ENUM('Sent','Received')
  - Associations: belongsTo Users (user_id), belongsTo Persons (payer_id)
  - Indexes: user_id, payer_id
- Transaction_Payees: references transactions and persons (services present; model not shown here).

6. Validation and Business Rules
- Zod validation enforced in controllers:
  - Auth: signup.auth.schema, login.auth.schema
  - Persons: create.person.schema, update.person.schema
  - Transactions: sent_create.transaction.schema, received_create.transaction.schema
  - Users: update_user.user.schema
- Passwords are hashed before persistence.
- All read/write operations are scoped to req.user.id (user-level isolation).
- List endpoints use limit=50 and page-based pagination.

7. Filtering and Query Semantics
- Helper: helpers/build_where_clause.helper maps custom operators to Sequelize Op (e.g., $like, $iLike, $gte, $lte, $between, $in, etc.).
- Persons filtering:
  - name => applied to full name via CONCAT(first_name, ' ', last_name) with case-insensitive match
  - mobile => LIKE
  - email => ILIKE/LIKE (dialect-aware)
- Transactions filtering:
  - datetime: from/to => $between | $gte | $lte
  - type: string or array => $in
- Count services mirror the same filters to compute totalCount.

8. Security
- JWT tokens created with helpers/create_jwt.helper; required on protected routes via auth.middleware.
- Helmet and CORS enabled at app level.
- OTP email verification in signup flow.

9. Error Handling
- Validation failures: 400 with message and errors array (from Zod).
- Auth failures: 401 (Invalid credentials), 404 (User not found).
- Not found: 404 for missing entities owned by the user.
- Server errors: 500 with error message.

10. Non-Functional Requirements
- Performance: Pagination (50/page) and indexed columns (transactions.user_id, transactions.payer_id).
- Reliability: Optional Sequelize transaction parameter supported in services for future atomic operations.
- Maintainability: Services per entity, schemas for validation, controllers thin.
- Security: JWT, OTP, Helmet, CORS.

11. API Summary (Effective Paths)
Note: These reflect the current mounting + route definitions.
- Auth
  - POST /auth/send-otp
  - POST /auth/signup
  - POST /auth/login
  - POST /auth/reset-password/send-otp
  - POST /auth/reset-password
  - POST /auth/change-password
- Users
  - GET  /users/profile
  - PUT  /users/profile
- Persons
  - Mounted at /persons; includes create, update, get by id, and paginated list (see controllers/person.controller.js)
  - Example: GET /persons with query filters (name, mobile, email)
- Transactions
  - POST /transactions/sent
  - POST /transactions/received
  - GET  /transactions?from=&to=&type=&page=
  - GET  /transactions/:id
- Transaction Payees
  - GET  /transaction-payees/:transactionId

12. Assumptions and Constraints
- Database dialect supports ILIKE (Postgres) or appropriate case-insensitive collation (MySQL). Current code uses Op.iLike where available.
- Server runs on port 3000 (configurable externally).
- Request bodies are JSON and validated via Zod before persistence.

14. Glossary
- JWT: JSON Web Token
- OTP: One-Time Password
- ILIKE: Case-insensitive LIKE (Postgres)

15. Appendices
- Key source files:
  - app.js
  - controllers/*.js
  - services/**/*.js
  - schemas/**/*.js
  - models/Transactions.js

End of Document.
