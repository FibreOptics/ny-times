## NYT Articles

A web-app created with create-react-app, node-sass and [NewYork-Times API](https://developer.nytimes.com/apis).<br />

#### Description

The website consists of the

- Homepage:
  - the page loads articles according to the device's date (year & month).
  - the search input automatically updates the articles with debounced final inputs.
- DeatailPage: the page renders the article's object keys.
- and the 404 not found page: a page to handle non-existing routes

The production can be found live at [NYT live](https://ny-times-pi.now.sh/)

#### External libraries used

- react-paginate

#### Known issues

- search has only 10 results due to not fetching any more with the offset option.
- searchInput can return incorrectly in some empty string cases.
- IOS devices having invalid date values
- 429: limited requests from NYT API

## Available Scripts

In the project directory, you can run:

### `yarn install`

then

### `yarn start`

THis will run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
