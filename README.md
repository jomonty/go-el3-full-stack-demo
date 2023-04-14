# Go & React Full-stack CRM
<!-- Table of Contents -->

<!-- About -->
A full stack lightweight CRM, with JWT based authentication, full CRUD functionality with MySQL for persistence, file upload and download capability and styled using Bootstrap5.

<!-- Goals -->
## Goals

<!-- Built With -->
## Built with
* Go
    * gin-gonic
    * gorm
    * godotenv/crypto/golang-jwt/cors
* React
    * react-router-dom
    * react-bootstrap
    * vite
<!-- Getting Started -->
## Getting Started
### Prerequisites
* Go, MySQL, NodeJS installed
#### Server

* Create a database in a local MySQL server

* Popoulate the SAMPLE.env file with DB information and set the mode to "seed" for the initial load, rename to ".env"

* Navigate to the server directory in a terminal window and run
    ```sh
    go run .
    ```

#### Client
I used pnpm for package management, but npm commands will work fine for the below.

* Navigate to the client directory in a terminal window and run
    ```sh
    pnpm install
    ```

* Then run the client web app in development
    ```sh
    pnpm run dev
    ```

* **if you set the RUN_PORT property in the .ENV file to anything other than 8080, please change the vite.config.js file to reflect this**

* Navigate to the address the dev server is running on and sign up, log in, have a look around and give me some feedback!
<!-- -->


