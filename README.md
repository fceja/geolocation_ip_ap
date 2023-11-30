# Description
After logging in, clicking the 'Get My Location' button will retreive users geo-coordinates and IP info. </br>
(requests user permission).




# Installation
![](https://img.shields.io/badge/Unix-informational?style=flat&logo=unix&logoColor=white&color=eaeaea)
![](https://img.shields.io/badge/OS-Linux-informational?style=flat&logo=linux&logoColor=white&color=eaeaea)
![](https://shields.io/badge/OS-MacOS-informational?style=flat&logo=Apple&logoColor=white&color=eaeaea)

- **Note: ```.env``` file with environment variables has been omitted. </br>
  - It will render ```loginForm``` component useless.
  - ```loginForm``` component was implemented to minimize unecessary pings to subscription-based endpoints when taking the app to production. 
    
- **Note: If installing locally, you can bypass the ```loginForm``` component by following the instructions in ```Bypass LoginForm Component``` section
before completing step 4.
 </br>

1. Clone repo
2. Install Node
   - ```https://nodejs.org/en/download```
3. At project root, run:
   - ```npm install```
   - This will install all project package dependencies
4. At project root, run:
   - ```npm start```
   - App will be served on ```http://localhost:8080/```

# Bypass LoginForm Component
  - modify the following file: ```/src/ts/context/AuthContext.tsx```
    - change -> ```const [isAuthenticated, setIsAuthenticated] = useState(false);```
    - to  -> ```const [isAuthenticated, setIsAuthenticated] = useState(true);```
  - create a free account at [ipinfo](https://ipinfo.io/), this will give you an api token.
    - create ```.env``` file at root project directory with following variables:
      - ```REACT_APP_IP_INFO_API_URL="https://ipinfo.io/json"```
      - ```REACT_APP_IP_INFO_API_TOKEN="{ipinfo_token}"```
        - replace ```{ipinfo_token}``` with actual value
      - ```REACT_APP_AXIOS_TIMEOUT="15000"```

# Technologies & Tools
<p>
  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer"
    style="text-decoration:none"
  >
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
      alt="typescript"
      width="40"
      height="40"
    />
  </a>
  <a href="https://react.dev/" target="_blank" rel="noreferrer" style="text-decoration:none">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      alt="react"
      width="40"
      height="40"
    />
  </a>
  <a href="https://developers.google.com/maps" target="_blank" rel="noreferrer"">
    <img
      src="https://developers.google.com/static/maps/images/maps-icon.svg"
      alt="googlemaps"
      width="40"
      height="40"
    />
  </a>
  <a href="https://sass-lang.com" target="_blank" rel="noreferrer">
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg"
      alt="sass"
      width="40"
      height="40"
    />
  </a>
  <a href="https://getbootstrap.com" target="_blank" rel="noreferrer">
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg"
      alt="bootstrap"
      width="40"
      height="40"
    />
  </a>
  <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
      alt="html5"
      width="40"
      height="40"
    />
  </a>
  <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      alt="aws"
      width="40"
      height="40"
    />
  </a>
  <a href="https://webpack.js.org" target="_blank" rel="noreferrer">
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg"
      alt="webpack"
      width="40"
      height="40"
    />
  </a>
</p>
