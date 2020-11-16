# Repo Stats

## About

This project is a demo of a data visualization App of a couple of Pull Request metrics, over a time span chosen by the user. The data is provided by the Athenian API.

This project uses react and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-Requisites

- [NodeJS](https://nodejs.org/en/)

## Install & run

Clone this repo. If you are able, you use your terminal like this:

```shell
$ git clone https://github.com/jcarias/repo-stats
```

After cloning to code, it is time to install the project's dependencies. Move into the cloned project folder and type:

```shell
$ yarn
```

Once the install process completes, you can run the app:

```shell
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Libraries

The project used a few libraries to leverage the development. Here are some of the outstanding ones:

- ["recharts"](https://recharts.org/en-US/): The library used to provide the charts for the data visualization. This library was chosen mainly due to prior experience with it.
- ["react-datepicker"](https://reactdatepicker.com/): Date picker components.
- ["moment"](https://momentjs.com/): Do date and time calculations and formatting.
- ["styled-components"](https://styled-components.com/): the main styling solution of the app.
- ["@tippyjs/react"](https://github.com/atomiks/tippyjs-react): Used to present customized tooltips.
- ["react-feather"](https://github.com/feathericons/react-feather): Open source icons used in the app.

## Outstanding Implementation Notes

### Technologies Used

This is app was made using React 17 and relied on functional components exclusively.

### API Calls

The API is called automatically when the app launches or dates range is changed. The call is made through the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) using the `useEffect` hook.

The logic to fetch the data is wrapped inside a custom hook [`useApiCall`](https://github.com/jcarias/repo-stats/blob/main/src/utils/hooks/useApiCall.js). The hook is set up with a two arguments (`startDate`and `endDate`) and it provides an object containing the following to the client component:

- `isLoading`: a boolean flag indicating if the request is running.
- `error`: an object containing the error information. (`null` if no errors exist).
- `data`: an object containing the response from the API (`null` if no data has been returned of if it is still loading).

Usage example:

```javascript
// (...)
const { data, error, loading } = useApiCall(new Date().getTime(), new Date().getTime());
// (...)
```

#### Request Object

This App has a couple of charts. In one of them (**Review Time**) it's needed the aggregated data of all the repos over a span of time. For the other (**PRs Opened**) the data needs to be aggregated in time be split by repo. To solve this there were 3 ways:

1. Send 2 separate calls to get the data needed for each chart.
2. Combine all the needs into the request object.
3. One call to get all the data with a minimal level of aggregation. Then the aggregation could be done in the client.

All have advantages and drawbacks.

I've chosen the **second approach** because it would allow the API to shine! Take a look at the request object:

```JSON
{
  "for": [
    {
      "repositories": [
        "github.com/athenianco/athenian-api",
        "github.com/athenianco/athenian-webapp",
        "github.com/athenianco/infrastructure",
        "github.com/athenianco/metadata"
      ],
      "repogroups": [[0], [1], [2], [3]]
    }, {
      "repositories": [
        "github.com/athenianco/athenian-api",
        "github.com/athenianco/athenian-webapp",
        "github.com/athenianco/infrastructure",
        "github.com/athenianco/metadata"
      ]
    }
  ],
  "metrics": [
    "pr-review-time",
    "pr-opened"
  ],
  "date_from": "2020-06-01",
  "date_to": "2020-09-01",
  "granularities": [
    "all",
    "day"
  ],
  "exclude_inactive": true,
  "account": 1,
  "timezone": 60
}
```

The `for` is being requested 2 different sets: one with separate data for each repo, and the other with all repos info joined together.

There is also needed to specify the `granularities`. These will allow to get the data aggregated and also split by days.

### Tab Manager

There are a two main view in the App: The Review Time and the PR Created. The user can swap between by choosing the one tab. These tabs are managed via a selection made in the `Tab` (dumb) component, and it's parent is responsible to show panel corresponding to the specific tab.\
This is very simple and unscalable solution, and it is one of the front runners for refactoring into a more robust, scalable and reusable solution...

I also considered using [React Router](https://reactrouter.com/) to choose the tab being displayed but, given the scope of this app, this might have been an overkill.

## Possible Future improvements

Here are some of the next improvements that might be considered:

- A more robust and cleaner approach to parse data coming from the API into the charts. The current solution is too depending on the data being returned from this specific request object. Also is not very readable and it's performance is not remarkable as well.
- Add internationalization. Currently all strings and formats are hardcoded in english.
- A better tab manager. This new manager would be configurable to have a variable amount of tabs, and the tabs data should contain all the meta-data necessary to render the tabs.
- More features.
- Using Typescript (TS). The current simplicity of the application would not benefit from using TS instead of JS. The additional effort needed to setup types plus some potential issues with the libraries used would render the long term benefits a bit pointless.
