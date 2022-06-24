# Next.js & React - The Complete Guide

Create a new project with:

```bash
npx create-next-app <project-name> --typescript
```

## Key features and benefits

- **Server-side rendering**
- automatic page pre-rendering: great for SEO and initial load
- blending client-side and server-side: fetch data on the server and server finished pages

- **File-based routing**
- define pages and routes with files and folders instead of code
- less code, less work, highly understandable

- **Fullstack Capabilities**
- easily add backend (server-side) code to your Next/React apps
- storing data, getting data, authentication, can be added to React project

## Routing

- Next.js offers file-based routing instead of code-based routing
- no react-router, no in-code route definition

### Index routes

- Next.js infers the routes from the `/pages` folder
- `pages/index.js → /`
- `pages/blog/index.js → /blog`

### Nested routes

- It also supports nested files:
- `pages/blog/first-post.js → /blog/first-post`
- `pages/dashboard/settings/username.js → /dashboard/settings/username`

### Dynamic routes

- It makes use of the bracket syntax, this allows to match named parameters
- `pages/blog/[slug].js → /blog/:slug (/blog/hello-world)`
- `pages/[username]/settings.js → /:username/settings (/foo/settings)`
- `pages/post/[...all].js → /post/* (/post/2020/id/title)`

Read more [here](https://nextjs.org/docs/routing/introduction)

## Page Pre-rendering

- Instead of loading data after the initial HTML code was loaded (SPA-related behavior), Nest.js pre-renders the page, all HTML content with all needed data
- Great for SEO
- It sends back the JS code which wil hydrate the code once loaded
- Only affects the initial load (first render)
- Then, the behavior is just like an SPA
- By default, Next.js pre-renders al pages that don't hae dynamic data
- Nest.js offers 2 ways of pre-rendering:
  - Static Generation: all pages are pre-generated
  - Server-side rendering: pages are created JIT

### Static Generation

- pre-generate a page during build time (in advance with data prepared on the server-side)
- can be cached by the server/CDN serving the app
- only `pages` con use the `getStaticProps` function

```javascript
export async function getStaticProps(context) {
  // server-side like logic
}
```

- this function allows to write server-side code inside this function
- will not be included in the code bundle (never seen by clients)

### Incremental Static Generation

- keeps updating the page for every incoming request, at most every x seconds
- serve "old" page if re-generation is not needed yet
- generate, store and serve "new" page otherwise
- it's possible to set a time for refreshing the data:

```typescript
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...
    },
    // refresh data every 10 seconds
    revalidate: 10,
  };
};
```

- **Note:** in dev mode, the page refreshes on every request, no matter the time set; only in prod mode, it'll update depending also on the time specified

- `getStaticProps` also has the `notFound` boolean property to display the `404 Page` in case we want to programatically do so

```typescript
export const getStaticProps: GetStaticProps = async () => {
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }
};
```

### Pre-generated Paths (Routes)

- dynamic pages ([id].js) don't just need data:
  - you also need to know which [id] values will be available
- multiple concrete [id] page instances (e.g id=1, id=2, etc) are pre-generated
- use `export async function getStaticPaths() {...}` for this
- it's important to specify the list of items to be pre-generated in advance:

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          product_id: "p1",
        },
      },
      {
        params: {
          product_id: "p2",
        },
      },
      {
        params: {
          product_id: "p3",
        },
      },
    ],
    fallback: false,
  };
};
```

- this also allows for pre-fetching data
- the `fallback` property works as a JIT page load, is not pre-generated but Next.js knows what pages to load JIT
- it's necessary to set the `fallback` property to `true`
- the dynamic pre-generation also requires a `fallback` state in the component since it takes a bit of time to load data
- the `fallback` property can also have the `blocking` value to wait for the page to be readily available, similar to a `loading` state

Read more about `getStaticPaths` [here](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)

**Note:** Dynamically pre-generated pages (which change depending on the `id` of an element), require to have both the `getStaticProps` and `getStaticPaths` to work together

### Server-side Rendering

- sometimes, you need to pre-render for every request or you need access to the request object
- Next.js allows to run "real server-side code" as well
- use `getServerSideProps` to achieve this

```typescript
export async function getServerSideProps() {...}
```

**Note:** you can only make use of either `getStaticProps` and `getServerSideProps` since they accomplish the same objective and clash in logic

- `getServerSideProps` will always run again for every request

- `getServerSideProps` is not affected by the pre-generation of pages since this code always runs on the server

## Client-side Data Fetching

- data that doesn't need to be pre-rendered
- data that changes a lot during time
  - data changing with high frequency (stock data)
  - highly user-specific data (last orders in shop)
  - partial data (only used on a part of a page)
- pre-fetching the data for page generation might not work or be required
- make use of the traditional client-side data fetching (useEffect with fetch)

### Combine client-side data fetching with pre-rendering

- leads to better UX
- the pre-generated data can serve as an initial state for the page
- you can make use of the "traditional" `useEffect/useState` hooks for setting data, or you can also use `useSWR`hook for fetching and revalidating data

```typescript
// client-side data fetching
const { data, error } = useSWR(
  "https://nextjs-course-c9cb8-default-rtdb.firebaseio.com/sales.json",
  (url) => fetch(url).then((res) => res.json())
);

// for initial state via props
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(
    "https://nextjs-course-c9cb8-default-rtdb.firebaseio.com/sales.json"
  );
  const sales = await data.json();

  const transformedSales: TransformedSales = [];

  for (const key in sales) {
    transformedSales.push({
      id: key,
      username: sales[key].username,
      volume: sales[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
    revalidate: 10,
  };
};
```

## Page Optimizations

- Next.js allows to add `meta` info using the `meta` tag and the `Head` component

```typescript
const component: NextPage = () => {
  return (
    <Head>
      <meta name="description" content="Take a look at all new events" />
      <title>NextJS Events</title>
    </Head>
  );
};
```

- Next.js allows to have multiple `Head` components, and also merges them
- in case of redundant tags, Next.js shows the latest
- it's possible to add a general `Head` component in the `_app.tsx` component, and specific `Head` components per page

### \_app.tsx vs document.ts

- `_app.tsx` is the app shell, root component inside of the `body` section
- `document.tsx` allows to customize the entire html document
- when you need to override the `default` HTML DOM, you can achieve so by creating a custom `Document` element in the `document.tsx` file

```typescript
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // default html structure for overriding
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* allows to have external react elements aside from the root */}
          <div id="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## API Routes

- URL's that don't return pages, but instead provide a REST API
- they work in a similar fashion to `Express.`
- requests are typically not sent by entering a URL, but instead via Javascript code (AJAX)
- you can add API routes in the `pages/api/` folder
- every file added to the `pages/api` folder will be treated as an endpoint, i.e `pages/api/feedback` becomes `/api/feedback`, with a `GET` method by default

### Client-side vs Sever-side data fetching

- it's possible to fetch or post data from an API route using the fetch method

```typescript
const loadFeedback = async () => {
  const response = await fetch("/api/feedback");
  const data = await response.json();
  setFeedbackItems(data.feedback);
};
```

- however, this will only work when using client-side data fetching
- when using server-side data fetching with `getStaticProps` or `getServerSideProps`, it's not possible to consume the API route directly
- you need to add server-side logic to fetch the data since this code is not bundled in the client code

```typescript
export const getStaticProps: GetStaticProps = async () => {
  // in this case, it's not recommended to use fetch to access an api route
  // instead, it's recommended to add the server-side logic for fetching/querying data since it'll not be available in the client bundle

  // TODO: same logic for getting data as in api/feedback api route
  return {
    props: {
      feedbackItems: [],
    },
  };
};
```

- you can access the submitted data (form, query params, ...) using the `req` object

```typescript
const handler: NextApiHandler = async (req, res) => {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = await extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
};
```
