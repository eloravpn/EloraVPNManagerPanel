# Elora VPN Manager Pannel
A pannel based on MUI for [Elora VPN Manager](https://github.com/eloravpn/EloraVPNManager/ "Elora VPN Manager")

## Screen Shots
![2023-10-06_15-49](https://github.com/eloravpn/EloraVPNManagerPanel/assets/125687916/f28fa7d9-d4d6-43d3-8f25-5a0c8a72153d)

![2023-10-06_15-50_1](https://github.com/eloravpn/EloraVPNManagerPanel/assets/125687916/2272cbaf-0793-40c8-9c29-44f4bea55065)

![2023-10-06_15-50](https://github.com/eloravpn/EloraVPNManagerPanel/assets/125687916/98caa4b5-f42c-46bf-b470-075eb2298f00)

# How to install
#### Requirements
Install `Nodejs v18.8+` and `yarn v1.22+` on your system.

Also you need to install and run successfully `Elora VPN Manager` as an API.
To install an run `Elora VPN Manager` please follow The Readme on [Elora VPN Manager](https://github.com/eloravpn/EloraVPNManager/ "Elora VPN Manager")

#### Clone the repository
`git clone https://github.com/eloravpn/EloraVPNManagerPanel.git && cd EloraVPNManagerPanel`

### Configuration
Copy `.env.example` to `.env` and changes the configuration based on you Instalation.
You must change bellow property to your  [Elora VPN Manager](https://github.com/eloravpn/EloraVPNManager/ "Elora VPN Manager") IP and Port.

```
REACT_APP_BASE_URL="http://YOUR_API_SERVER_IP_OR_DOMAIN:8000/api/"
```
> Please consider, to avoid CROSS errors you must run API Server and Panel in single machine or use equal Domain

 #### Install packages and Run
`yarn install && yarn start`

Go to `http://YOUR_SERVER_IP_OR_DOMAIN:3000` to see panel.

> The default user name and password is `admin`
