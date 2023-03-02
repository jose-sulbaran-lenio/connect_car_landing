# useAxios - Custom Hook for HTTP Requests with Axios

useAxios is a custom React hook for performing HTTP requests using [axios](https://github.com/axios/axios) library. It provides a convenient and efficient way to handle HTTP requests, error handling, and loading state, all in one hook.

## Usage

To use useAxios, import the hook and the instance of axios in your component:

```javascript
import { useAxios } from "./useAxios";
```

Then, you can call the hook and pass in the options for the HTTP request:

```javascript
const { data, loading, error, call } = useAxios({
  url: "/api/posts",
  makeCall: true,
});
```

## Options

The hook accepts the following options:

- **url**: (required) the URL of the API endpoint.
- **method**: (optional) the HTTP method for the request, such as 'get', 'post', 'put', etc. Default is 'get'.
- **body**: (optional) the request body for post and put requests.
- **params**: (optional) the query parameters for the request.
- **makeCall**: (optional) a boolean flag indicating whether the request should be automatically made when the component is rendered. Default is false.

## Returns

The hook returns an object with the following properties:

- **data**: the data from the HTTP response.
- **loading**: a boolean indicating whether the request is currently loading.
- **error**: an error that occurred during the request, if any.
- **call**: a callback function to make a custom HTTP request with specific options.

## Example 1

Here's an example of how you can use the useAxios hook to fetch a list of posts from an API:

```javascript
import React from "react";
import { useAxios } from "./useAxios";

const PostsList = () => {
  const { data, loading, error } = useAxios({
    url: "/api/posts",
    makeCall: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostsList;
```

## Example 2

Here's an example, of how to use the `call` method

In this example, we have a form for creating a new post, and we use the `call` function to make a `post` request to the API with the new post data. The `call` function allows us to make the HTTP request with specific options, in this case, with the request body.

```javascript
import React, { useState } from 'react';
import { useAxios } from './useAxios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { data, loading, error, call } = useAxios({
    url: '/api/posts',
    method: 'post',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, body };
    await call({
      body: newPost,
    });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button type="submit">Create</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CreatePost;

```