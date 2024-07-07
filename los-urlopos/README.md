# Los Urlopos - web app for your company's holiday management

This app was created specifically to manage company's holiday days.

Please read section Usage/Examples for further description

## Deployment

To deploy this project, open your terminal in the main folder and run:

```bash

npm install

```

then to run your local server

```bash

npm run dev

```

This will allow you to run it on your local machine

When you change API keys to the ones you own(which is essential to deploy it with your database), you must create .env file in main folder (los-pollos/) and update credentials, as shown below:

```javascript
VITE_API_KEY = "XXXXX";

VITE_AUTH_DOMAIN = "XXXXX";

VITE_PROJECT_ID = "XXXXX";

VITE_STORAGE_BUCKET = "XXXXX";

VITE_MESSAGING_SENDER_ID = "XXXXX";

VITE_APP_ID = "XXXXX";

// XXXXX - your firebase api data
```

## Logging in

When app is running, you will see login panel as below

<img src="https://i.ibb.co/yp3TpGk/LOGIN.png" width=500px alt="LOGIN" border="0">

You must have your account created by your company's admin.
Given the password and login you will be able to successfully get in.

It is highly recommended to change your password after 1st login, and you are moved to Settings tab automatically as a Landing page.

## Using the app - employee

### Main navigation

Depending on your position in the company, you will be given access to fields User and possibly Supervisor, if you are given team to manage. If you are admin, Admin field will be visible as well. For all users, Settings and Logout are always there

### User panel

In User panel, you see the statistics of your current days available and status graph of your requests.
Below, you see list of your requests and you can add a new one, which will be further analysed by your Supervisor

<img src="https://i.ibb.co/xG5hh1N/request-add.gif" width=500px alt="request-add" border="0">
  
  ### Supervisor panel
  Similarly to User panel, as a manager you will be able to review requests in your department and decide whether you accept or decline ones request. You cannot decline On Demand requests.
  
<img src="https://i.ibb.co/VvxprKW/super-rwquest.gif" width=500px alt="super-rwquest" border="0">
  
  ## Using the app - Admin

### Main Navigation

As an admin, you are given options to select list of all employees, or all departments and to manually set Bank Holidays

### Users

Given data from an HR department, create user and set his initial password. You can later on Edit this user or Delete him, but it is recommended to initially put all proper data

### Departments

If the department will be created or deleted, or managers will change, you can update it here.

### Admin Actions

You can update New Year's holidays for every user in the company, and add a new Bank Holiday if needed.

## Authors

- [Michal Platonow](https://www.github.com/platek92)

- [Pawel Jazdzyk](https://github.com/PawelJazdzyk)

- [Andrzej Palica](https://github.com/andrzejpalica)

- [Kamil Szubzda](https://github.com/kasz91)

- [Klaudia Gajewska](https://github.com/gajewskaklaudia99)

### Honorable mentions

Technical overiew and support by:

- [Bartlomiej Galicki](https://github.com/bartgalicki)
- [Rafal Opacki](https://github.com/RafalOpacki)
