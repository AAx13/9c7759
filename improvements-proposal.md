
### Proposal

---

If the data came from an API, using the useEffect hook to ensure no side effects are made from the component body. From within the useEffect hook scope, we define an async function that will call and await a response from the JS fetch method querying the endpoint where the data might reside. Upon receiving the data we then jsonify that data and parse it the same way we did in the previous implementation, or handle any errors the response might have raised. Additionally, we can increase performance at scale (should we want higher page size options) by windowing or only writing a small portion of our data to the DOM at a time rather than our application waiting for the worst case amount of data to be written on the DOM before it is visible.

The issue with the nanoid key generation implementation as it is now is since a key is generated for each list item as its mapped from the data, if there was any change made to the data itself, react will trigger a reconcilliation diff and re-render the entire list. Any add, delete, or reorder operation will yield unknown results or at worst case re-render a massive data set, causing the application to become less performant. If the data came from an API call, it would make sense for id assignment to happen in the back-end.