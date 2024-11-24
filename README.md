# Elora VPN Manager Pannel

A pannel based on MUI for [Elora VPN Manager](https://github.com/eloravpn/EloraVPNManager/ 'Elora VPN Manager')

## Screen Shots

![photo_2024-11-24_12-12-41](https://github.com/user-attachments/assets/72b44475-5d0d-4b3f-93fb-4c8ee5217771)

![photo_2024-11-24_12-12-33](https://github.com/user-attachments/assets/c70e2a73-3d3f-41bf-b6d6-d317d28cecdf)

![photo_2024-11-24_12-12-36](https://github.com/user-attachments/assets/35ad564f-3f34-4e86-bba8-2e398f837752)



# How to install

#### Requirements

Install `Nodejs v18.8+` and `yarn v1.22+` on your system.

Also you need to install and run successfully `Elora VPN Manager` as an API.

To install an run `Elora VPN Manager` please follow The Readme on [Elora VPN Manager](https://github.com/eloravpn/EloraVPNManager/ 'Elora VPN Manager')

#### Clone the repository

`git clone https://github.com/eloravpn/EloraVPNManagerPanel.git && cd EloraVPNManagerPanel`

### Configuration

Copy `.env.example` to `.env` and changes the configuration based on you Instalation.
You must change bellow property to your [Elora VPN Manager](https://github.com/eloravpn/EloraVPNManager/ 'Elora VPN Manager') IP and Port.

```
REACT_APP_BASE_URL="http://YOUR_API_SERVER_IP_OR_DOMAIN:8000/api/"
```

> Please consider, to avoid CROSS errors you must run API Server and Panel in single machine or use equal Domain

#### Install packages and Run

`yarn install && yarn start`

Go to `http://YOUR_SERVER_IP_OR_DOMAIN:3000` to see panel.

> The default user name and password is `admin`
