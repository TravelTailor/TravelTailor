# TravelTailor

## Description

TravelTailor is an online tool that unifies some necessary utilities to plan your trips. These utilities will help you find out the weather, search for points of interest and explore the maps of the places you want to visit. You can also save all your trips and tasks in the database associated with your user.

## Built with

- HTML / CSS / JavaScript / Handlebars
- npm / MongoDB / NodeJS / ExpressJS
- Mapbox / AccuWeather / OpenTripMap

## User stories

## Server Routes (back-end)

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

[fly.io](https://travel-tailor.fly.dev/)
