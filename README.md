# cross platform job seeker web app with weather integration

## features implemented

- Auth (using [firebase auth](https://firebase.google.com/docs/auth/))
  - signing in using emails/password or google
  - registering using emails/password or google
- Profile
  - profile avatar via upload
  - first/last name
  - education
  - skills
  - position via [leaflet](https://leafletjs.com) map (location picker/current location)
  - emails
  - phone numbers
  - social links
  - cv via upload
    - extracting emails, social links or phone number via parsing the cv
    - populate the profile editing form with any extracted data from the cv
- Weather (using [openweathermap](https://openweathermap.org/))
  - getting weather forecast based on the position provided in the user profile
- Validation (using [zod](https://github.com/colinhacks/zod))
  - api validation
  - form validation
- State management ([redux toolkit](https://redux-toolkit.js.org/))
- Routing (using [react router dom](https://reactrouter.com/))
- Styling and Responsiveness (using [tailwind css](https://tailwindcss.com/))
- Backend API (using [expressJS](https://expressjs.com/))
- Database (using [firebase firestore](https://firebase.google.com/docs/firestore/))

## faced challenges

- implementing location picker
- wasted time implementing un-reliable forcast retrieval using country and city (openweathermap data mismatch)
- spitting the editing form into multiple components without passing callbacks (solved using [react form hock](https://react-hook-form.com/))