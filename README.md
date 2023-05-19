# TravelTailor

## app access

[Try TravelTailor!](https://travel-tailor.fly.dev)

## Description

TravelTailor is an online tool that unifies some necessary utilities to plan your trips. These utilities will help you find out the weather, search for points of interest and explore the maps of the places you want to visit. You can also save all your trips and tasks in the database associated to your user.

## Built with

- HTML / CSS / JavaScript / Handlebars
- npm / MongoDB / NodeJS / ExpressJS
- Mapbox / AccuWeather / OpenTripMap

## User stories

- **404** - As users, we want to see a nice 404 error page when we go to a page that doesn’t exist so we know it's our fault. :cold_sweat:
- **500** - As users, we want to see a nice 500 error page when the team behind the app breaks something and it's not our fault.
- **Homepage** - As users, we want to access the homepage and be able to sign up and log in. :house:
- **Search page** - As users, we want to search for a destination to travel to. :earth_africa:
- **Search results page** - As users, we want to see how is the weather and explore the map of the place we have previously searched. :partly_sunny:
- **Create travel form** - As users, we want to be able to create our trip in the database by adding the dates and the budget we have. :money_with_wings:
- **Travel list page** - As users, we want to see a list with our trips to find them at a glance. :eyes:
- **Travel details page** - As users, we want to see the details of our trip and be able to add and edit tasks to do. :compass:
- **Create tasks page** - As users, we want to search among the points of interest of our destination to help us create tasks to do, adding a date and its cost. :mag_right:
- **Edit travel page** - As users, we want to be able to edit the dates of our travel, the budget we have and an image that represents our trip. :statue_of_liberty:
- **Profile user page** - As users, we want see our data and be able to edit it, adding an avatar picture and our real name if we wish for it. :raising_hand:
- **Sign up form** - As users, we want to be able to create an account and become a traveller. :luggage:
- **Log in form** - As users, we want to enter TravelTailor and begin to use this amazing app! :airplane:

## Server Routes (back-end)

|     **Route**    | **HTTP Verb** |                     **Description**                    | **Request - body** |
|------------------|---------------|--------------------------------------------------------|--------------------|
|        `/`       |     `GET`     | Main screen. Renders `index` view.                     |                    |
|   `/signup`      |     `GET`     | Sign up form. Renders `signup` view.                   |                    |
|   `/signup`      |     `POST`    | Sends signup form and creates User in DB. Redirects to `/userProfile`. |{ username, email, password }|
|   `/login`       |     `GET`     | Login form. Renders `login` view.                      |                    |
|   `/login`       |     `POST`    | Sends login form, redirects to `/search`.              |  {email, password} |
|   `/search`      |     `GET`     | Destination search bar. Renders `search` view.         |                    |
|   `/city-search` |     `GET`     | Query results page. Renders `city-search-result` view. |  req.query.city    |
|   `/create-travel/:city` |     `GET`     | Create travel form. Renders `create-travel` view. |  req.params.city   |
|   `/create-travel/:city` |     `POST`    | Sends travel form. Redirects to `/travel-list` |{ country, city, startDate, endDate, budget }|
|   `/travel-list` |     `GET`     | Our travel list page. Renders `travel-list` view.      |                    |
|   `/travel-list/:travelId` |     `GET`     | Travel details page. Renders `travel-details` view. |  req.params.travelId |
|   `/travel-list/:travelId/edit` |     `GET`     | Edit travel form. Renders `edit-travel` view. |  req.params.travelId |
|   `/travel-list/:travelId/edit` |     `POST`    | Sends edit travel form. Redirects to `/travel-list/${travelId}`. |{ country, city, travelImg, startDate, endDate, budget }|
|   `/travel-list/:travelId/delete` |     `POST`    | Deletes a trip. Redirects to `/travel-list`. |  req.params.travelId |
|   `/travel-list/:travelId/create-task` |     `GET`     | Create task form. Renders `create-task` view. |  req.params.travelId |
|   `/travel-list/:travelId/create-task` |     `POST`    | Sends task form. Redirects to `/travel-list/${travelId}`. |{ task, date, status, price }|
|   `/travel-list/:travelId/edit-task/:taskId` |     `POST`    | Edit task form. Redirects to `/travel-list/${travelId}`. |{ task, date, status, price }|
|   `/travel-list/:travelId/delete-task/:taskId` |     `POST`    | Deletes a task. Redirects to `/travel-list/${travelId}`. |  req.params.taskId |
|   `/userProfile` |     `GET`     | User profile page. Renders `user-profile` view.        |  req.session.currentUser |
|   `/userProfile/:id/edit` |     `GET`     | Edit user data form. Renders `user-profile-edit` view. |  req.session.currentUser |
|   `/userProfile/:id/edit` |     `POST`    | Sends user data form. Redirects to `/userProfile`. |{ username, email, profileImg, name }|
|   `/logout`      |     `GET`     | Log out button. Redirects to `index` view.             |                    |

## Models

### Travel.model.js
```javascript
{
    country: {
        type: String,
        required: [true, "Country is required."],
    },
    city: {
        type: String,
        required: [true, "City is required."],
    },
    travelImg: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/4164/4164916.png",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required."],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required."],
    },
    budget: {
        type: Number,
        required: [true, "Budget is required."],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
    }]
}
```
### Task.model.js
```javascript
{
    task: {
        type: String,
        required: [true, "Task is required."],
    },
    date: {
        type: Date,
        required: [true, "Date is required."],
    },
    status: {
        type: String,
        required: [true, "Status is required."],
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    travel: {
        type: Schema.Types.ObjectId,
        ref: "Travel",
    },
}
```
### User.model.js
```javascript
{
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    profileImg: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png",
    },
    name: {
      type: String,
    }
  }
```
## Links

[Trello](https://trello.com/b/bo4y8dau/travel-tailor)

[GitHub](https://github.com/TravelTailor/TravelTailor)

[fly.io](https://travel-tailor.fly.dev)
