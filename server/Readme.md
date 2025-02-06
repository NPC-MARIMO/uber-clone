# Backend API Documentation

## Overview

This backend provides a set of RESTful API endpoints for user authentication and management, including registration, login, profile retrieval, and logout. The API also includes an endpoint to obtain version information.

## Data Flow

1. **User Registration**: Users can register by providing their full name, email, and password. Upon successful registration, a JWT token is generated and returned along with the user details.

2. **User Login**: Registered users can log in by providing their email and password. If the credentials are correct, a JWT token is issued, allowing access to protected resources.

3. **Profile Retrieval**: Authenticated users can retrieve their profile information using the JWT token.

4. **User Logout**: Users can log out, invalidating the current session token.

5. **Version Information**: Provides the current version of the API.

## Endpoints

### Register User

* **POST /users/register**
  - **Request Body**:
    - `fullname`: object (required)
      - `firstname`: string (required, min 3 characters)
      - `lastname`: string (optional, min 3 characters)
    - `email`: string (required, valid email)
    - `password`: string (required, min 6 characters)
  - **Response**:
    - `token`: string (JWT token)
    - `user`: object
      - `_id`: string (user id)
      - `fullname`: object
        - `firstname`: string
        - `lastname`: string
      - `email`: string
  - **Errors**:
    - `400 Bad Request` if request body is invalid
    - `409 Conflict` if user with the same email already exists

### Login User

* **POST /users/login**
  - **Request Body**:
    - `email`: string (required, valid email)
    - `password`: string (required, min 6 characters)
  - **Response**:
    - `token`: string (JWT token)
    - `user`: object
      - `_id`: string (user id)
      - `fullname`: object
        - `firstname`: string
        - `lastname`: string
      - `email`: string
  - **Errors**:
    - `400 Bad Request` if request body is invalid
    - `401 Unauthorized` if email or password is incorrect

### Get User Profile

* **GET /users/profile**
  - **Request Headers**:
    - `Authorization`: string (Bearer JWT token)
  - **Response**:
    - `user`: object
      - `_id`: string (user id)
      - `fullname`: object
        - `firstname`: string
        - `lastname`: string
      - `email`: string
  - **Errors**:
    - `401 Unauthorized` if JWT token is invalid or missing

### Logout User

* **GET /users/logout**
  - **Request Headers**:
    - `Authorization`: string (Bearer JWT token)
  - **Response**:
    - `message`: string ("logged out")
  - **Errors**:
    - `401 Unauthorized` if JWT token is invalid or missing

### Version Information

* **GET /version**
  - **Response**:
    - `version`: string (semantic version, e.g., "1.2.3")

### Error Format

* All endpoints return errors in the following format:
  - `error`: object
    - `message`: string (error message)
    - `code`: number (error code)
    - `name`: string (error name)

