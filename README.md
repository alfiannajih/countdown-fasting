<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Countdown Ramadhan Fasting</h3>
  <p align="center">
    Developing full stack app that can help users know the start and end times of their Ramadan fasting periods based on their city.
    <br />
    <br />
    <a href="https://countdown-ramadhan-fasting.netlify.app/">View Demo</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com) -->

The objective of this project is to create a website that performs a countdown to the remaining time of the start and end of Ramadhan fasting periods by entering the city name. As shown in the image above, this project use third-party API to obtain the timings of the fasting periods and the location name in structured form.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!--
<!-- GETTING STARTED -->
## Getting Started

Here are a few steps to follow in order to run the project locally on your computer and doing some experiments with it.

### Prerequisites

Before doing the installation
make sure you have Python, Node.js and npm installed on your computer. For the installation guide, you can refer to the  official documentation.

### Installation
1. Clone this repository
   ```sh
   git clone https://github.com/alfiannajih/countdown-fasting .
   ```
2. For the backend app, follow the installation below:
   - Change directory to the backend
     ```sh
     cd backend
     ```
   - Create virtual environment
     ```sh
     python -m venv venv
     ```
   - Install required packages
     ```sh
     pip install -r requirements.txt
     ```
   - Create new file `.env` and insert your IP Geolocation API key
     ```sh
     IPGEOLOCATION_API_KEY=<API-KEY>
     ```
   - Run the app
     ```sh
     hypercorn main:app --bind 0.0.0.0:80
     ```

3. For the frontend app, follow the installation below:
   - Change directory to the backend
     ```sh
     cd frontend
     ```
   - Install the react app
     ```sh
     npm install
     ```
   - Start the react app
     ```sh
     npm run start
     ```
   - Open your web browser by entering the URL below
     ```sh
     localhost:3000
     ```

Happy Coding!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## To Do

- [x] Add function to call geo location API
- [x] Add function to call fasting periods API
- [x] Design the website
- [ ] Create footer
- [ ] Make it responsive 


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Bahrul Alfian Najih- [Linkedin](https://www.linkedin.com/in/bahrul-alfian-najih/) - alfiannajih@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>