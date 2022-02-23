# Tenancies Administrator

## Steps to run locally

1. In the project directory, run:

```
json-server --watch db.json --port 1337
```

Starts a json database server, needed for CRUD of tenancies

2. In a separate terminal, run:

```
npm start
```

Runs the app in the development mode.

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Demo app

Visit https://properties-administrator.herokuapp.com/

## Backlog / todo-list

### Features

- Possibility to update tenancy information
- When creating tenancy, auto-fetch post-code and other data for a steet address to the user does not have to do so manually
- When creating tenancy, give feedback to the user what's expected in each input and why "Create" may be disabled
- Possibility to login and logout to different accounts (and remove hardcoded landlord Nils)
- Localistation
- Google street view for tenancies
- Sorting and filtering of tenancies

### Bugs

- You sometimes have to click twice to select a street search result. Reproduce this bug by searching for the street "Berling", select "Berlingsbakke", then "Berlingsbakke 1, , 2920 Charlottenlund" to then finally select the real address "Berlingsbakke 1, 2920 Charlottenlund". Have not investigaded it further.

### Tech debt

- Set up unit tests
- Create a real backend
- Spend more time on the auto complete functionality
- Update the design to something that does not look like it's from the 90s
