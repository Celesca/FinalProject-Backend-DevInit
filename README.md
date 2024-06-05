<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <a href="https://github.com/Celesca/Celesca/blob/main/Project%20Picture/EraPlannerLogo.png">
    <img src="https://github.com/Celesca/Celesca/blob/main/Project%20Picture/EraPlannerLogo.PNG" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Era Planner (Backend)</h3>

  <p align="center">
    Make your life easier by plan your life in this awesome web application!
    <br />
    <br />
    <a href="https://era-planner.vercel.app/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#test-report">Test Report</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Era Planner is the Front-end project that have concept of managing daily life.
You can locate the Era Planner Front-end Repository here : [<a href="https://github.com/Celesca/">GitHub Repo</a>](https://github.com/Celesca/FinalProject-Frontend-DevInit)

For this project is the new chapter or the Backend server for the old project which is from the Dev Init Program too.

There are several endpoints of feature you can use:
* User endpoints
* Todo-list endpoints
* Daily Log endpoints
* Event endpoints

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* Express (TypeScript)
* PostgreSQL
* Jest.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

First you need to setting up your locally folder.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is how to list things you need to use the software and how to install them via npm.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Following the guide from below through your terminal._

1. Clone the repo
   ```sh
   git clone https://github.com/Celesca/FinalProject-Backend-DevInit
   ```
2. Move to folder directory
   ```sh
   cd FinalProject-Frontend-DevInit
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the backend server (Port 3000)
   ```sh
   npm run dev
   ```
5. Start database server with docker (Port 5432)
   ```sh
   docker-compose up --build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Test Report -->
## Test Report

### 1. Page Load and Rendering

#### Test Case 1:
- **Description:** Successfully loads and displays accurate information on the home page.

#### Test Case 2:
- **Description:** Successfully loads and displays the current calendar on the calendar page.

#### Test Case 3:
- **Description:** Loads and displays the daily journal page, presenting a form for writing entries.

### 2. User Interaction

#### Test Case 4:
- **Description:** Clicking on a To-Do List item opens the edit page for that item.

#### Test Case 5:
- **Description:** Adding a new activity in the calendar works correctly.

#### Test Case 6:
- **Description:** The To-Do search function within the application operates as expected.

### 3. Responsive Design

#### Test Case 7:
- **Description:** The home page displays correctly on mobile screen sizes.

#### Test Case 8:
- **Description:** The calendar page adapts appropriately to tablet screen sizes.

#### Test Case 9:
- **Description:** The daily journal page shows suitable rendering on large screens.

### 4. Specific Functional Testing

#### Test Case 10:
- **Description:** Successfully saves data in the daily journal form, and retrieval of that data works as intended.

#### Test Case 11:
- **Description:** Creation and deletion of items in the To-Do List function as expected.

#### Test Case 12:
- **Description:** Theme changes and user-specific settings are applied and saved correctly.

### 5. App Functionality

#### Test Case 13:
- **Description:** The functionality of notifications or reminders is tested and verified.


## Automate Testing using Jest.js

```sh
npm test
```

## Videos about touring this project
  - Recording the testing and checked all the test cases.
  - Video : [FinalProject_DevInit_Video](https://www.youtube.com/watch?v=LyzN7LaHycQ)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Linkedin - [Sawit Koseeyaumporn](https://www.linkedin.com/in/sawit-koseeyaumporn-418941256/)

Project Link: [EraPlanner](https://github.com/Celesca/FinalProject-Frontend-DevInit)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
