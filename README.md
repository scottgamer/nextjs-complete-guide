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
export async function getStaticProps(context) {}
```

- this function allows to write server-side code inside this function
- will not be included in the code bundle (never seen by clients)
