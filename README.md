# Blog Website Restful-API using Nodejs + Typescript + Expressjs + Moongoose + JWT

## Features
- User Login | Signup
- Password encrypted through Bcrypt
- User Verification using OTP sent to user email using Sendgrid
- User can update their profile pic using Multer
- Reset Password through OTP sent to user email using Sendgrid
- User can add Post
- User can see all the Post
- User can edit or delete Posts
- User can add comments to any Post
- User can edit or delete their comments

___

## Project Structure

    ├── dist                    # Compiled Typescript files
    ├── src                     # Source files
    ├── uploads                 # User profile pics 
    └── ...


## Src Structure

    .
    ├── ...
    ├── src
    │   ├── ...
    │   ├─ server.ts           # server config
    |   ├─ index.ts            # starting point
    │   └── ...
    └── ...

____

## Tech Stack :- 
- [Node js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express js](https://expressjs.com/)
- [Mongoose](https://www.mongodb.com/)

____

## Run locally on your machine:
You need to have installed _npm_ _globally_.

Global Pacakage
``` shell
npm i -g nodemon ts-node typescript
```

Clone this repository
``` shell
git clone https://github.com/endokishan/Blog-REST-API.git
```

Install dependencies
``` shell
npm install
```

> **_NOTE :_**  Rename .env.example to .env and place your Key.


Start NodeJS Server in development
``` shell
npm run dev 
```

____

## Rest-API Documentation

## Indices

* [User](#user)

  * [Signup](#5-signup)
  * [Login](#1-login)
  * [Verify](#8-verify)
  * [Resend Verification Email](#2-resend-verification-email)
  * [Reset Password](#3-reset-password)
  * [Reset Password](#4-reset-password)
  * [Update Password](#6-update-password)
  * [Update Profile Pic](#7-update-profile-pic)



* [Post](#post)

  * [Add Post](#1-add-post)
  * [Delete Post](#2-delete-post)
  * [Edit Post](#3-edit-post)
  * [Get All Post](#4-get-all-post)
  * [Get Post by User](#5-get-post-by-user)
  * [Get Single Post](#6-get-single-post)


* [Comments](#comments)

  * [Add Comment](#1-add-comment)
  * [Delete Comment](#2-delete-comment)
  * [Edit Comment](#3-edit-comment)


--------

## User



### 1. Login



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://blogging-rest-api.herokuapp.com/api/user/login
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| email | user@gmail.com |  |
| password | userpassword |  |



### 2. Resend Verification Email



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://blogging-rest-api.herokuapp.com/api/user/resend/verification/email
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



### 3. Reset Password



***Endpoint:***

```bash
Method: PATCH
Type: 
URL: https://blogging-rest-api.herokuapp.com/api/user/reset/password
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| reset_password_token | otp |  |
| new_password | new password |  |
| confirm_password | new password |  |



### 4. Reset Password



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://blogging-rest-api.herokuapp.com/api/user/reset/password
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| email | user@gmail.com |  |



### 5. Signup



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/user/signup
```



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| username | username |  |
| email | user@gmail.com |  |
| password | userpassword |  |



### 6. Update Password



***Endpoint:***

```bash
Method: PATCH
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/user/update/password
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| password | old password |  |
| new_password | new password |  |
| confirm_password | new password |  |



### 7. Update Profile Pic



***Endpoint:***

```bash
Method: PATCH
Type: FORMDATA
URL: https://blogging-rest-api.herokuapp.com/api/user/update/profilePic
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| profile_pic |  | upload profile pic |



### 8. Verify



***Endpoint:***

```bash
Method: PATCH
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/user/verify
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| verification_token | otp |  |



---

## Post



### 1. Add Post



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/post/add
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | your new Post title |  |
| content | Your new Post content  |  |



### 2. Delete Post



***Endpoint:***

```bash
Method: DELETE
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/post/delete/5ffb501607975bf325956265
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***



### 3. Edit Post



***Endpoint:***

```bash
Method: PATCH
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/post/edit/5ffb571bbc83abfd0b19d420
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | Edit Post Title |  |
| content | Edit Post Content |  |



### 4. Get All Post



***Endpoint:***

```bash
Method: GET
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/post/all
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| page | page number |  |



***Body:***



### 5. Get Post by User



***Endpoint:***

```bash
Method: GET
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/post/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| page | page number |  |



***Body:***



### 6. Get Single Post



***Endpoint:***

```bash
Method: GET
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/post/5ffb501607975bf325956265
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***

___

## Comments



### 1. Add Comment



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/comment/add/5ffb5737bc83abfd0b19d421
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMjEyNDc2MSwiZXhwIjoxNjIyNDkyNzYxfQ.noEpmtI77W9dSWMm-WRbPtouoKiSQ3u823zDy3kQhUs |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| comment | your comment |  |



### 2. Delete Comment



***Endpoint:***

```bash
Method: DELETE
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/comment/delete/5ffb55f0c2f59cf937c1bdca
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***



### 3. Edit Comment



***Endpoint:***

```bash
Method: PATCH
Type: URLENCODED
URL: https://blogging-rest-api.herokuapp.com/api/comment/edit/5ffb55f0c2f59cf937c1bdca
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZG9raXNoYW5AZ21haWwuY29tIiwidXNlcl9pZCI6IjVmZjM3ZmIxNGZkOGQzMDFiMmMwMjU2OSIsImlhdCI6MTYxMDIwMjY0NywiZXhwIjoxNjIwNTcwNjQ3fQ.OoZ7uX7ec5Ke-ZaIkTSzYW75_DD2tBpP4vfXplruoVw |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| comment | edit comment |  |

____