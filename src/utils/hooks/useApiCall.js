import { useEffect, useState } from "react";
import moment from "moment";


const API_URL = 'https://api.athenian.co/v1/metrics/prs';


const defaultRequestBody = {
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
};


export const useApiCall = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setError(null);
    setData(null);
    setLoading(true);
    fetch(API_URL,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          ...defaultRequestBody,
          "date_from": moment(startDate).format('YYYY-MM-DD'),
          "date_to": moment(endDate).format('YYYY-MM-DD')
        })
      })
      .then(res => {
        if (res.ok)
          return res.json()
        else throw (res.status);
      })
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
    return () => {
    }
  }, [startDate, endDate])

  return { data, error, loading };
}