# Go & React Full-stack CRM
<!-- Table of Contents -->

<!-- About -->
A full stack lightweight CRM, with JWT based authentication, full CRUD functionality with MySQL for persistence, file upload and download capability and styled using Bootstrap5.
<br>
<br>
<!-- Goals -->
## Goals
Facilitate learning Go and Bootstrap5 by developing a CRUD app for a basic CRM system. 

The server should have persistence via an ORM, JWT-based authentication, file upload and association to customer entity with retrieval, with stretch goals of implementation of paginatation and search functionality.

The client should have authentication handling, a simple UI that makes use of functionality offered by the server, and it should make use of many standard Bootstrap components such as Modals, Alerts, Tables etc.
<br>
<br>
<!-- Outcomes -->
## Outcomes
I really enjoyed making this. I was looking for a way to push myself beyond what I've achived in past work and I was curious about Go, so I was super excited to get started. 

Not having used Go before, I started off with tutorials covering each of the main features I wanted the app to have (RESTful API, ORM, authentication etc), and built mini-projects for each one before planning out (I used Postman to plan and document the API routes - https://www.postman.com/jomonty/workspace/go-el3-full-stack-demo) and building out the functionality, consolidating and continuing to learn as I went. 

On the front end, I've been trying to get exposure to as many CSS frameworks as possible so it was great to get a chance to use Bootstrap. Honestly, I found it a little fiddly to begin with, having just spent some time using TailwindCSS, but I quickly found that once I got familiar with the components it is really quick to get things running with.
<br>
<br>
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
<br>
<br>
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


