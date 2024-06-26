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
npm run rev
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

## Usage/Examples

When app is running, you will see login panel as below

PICTURE HERE

You must have your account created by your company's admin, given the password and login you will be able to succesfully login. You may change your password after 1st login

GIF HERE

## Authors

- [Michal Platonow](https://www.github.com/platek92)
- [Pawel Jazdzyk](https://github.com/PawelJazdzyk)
- [Andrzej Palica](https://github.com/andrzejpalica)
- [Kamil Szubzda](https://github.com/kasz91)
- [Klaudia Gajewska](https://github.com/gajewskaklaudia99)

### Honorable mentions

Technical overiew and support by: [Bartlomiej Galicki](https://github.com/bartgalicki)
