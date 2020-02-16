# Flickr Photo Stream

A client-only web app built using React (`create-react-app`). Built in order to satisfy the criteria of a specific technical assessment.

## Features

- Searching of Flickr by tags.
- A set of default tags which are chosen from at random when the user hasn't input any search tags yet.
- Fully respnonsive (the number of columns drops from 4 to 2 on smaller screen sizes).
- Infinite scrolling to fetch more results (a maximum of 50 results are returned with each fetch).
- lazy loading of images for increased performance, so that images won't render unless they are actually visible on the screen.
- Stripping of any HTML content contained within photo descriptions, which was causing some rendering issues.

## Considerations

### Security

Throughout the project's development I was sure not to commit its private Flickr API key to source control, which would have been a clear security concern. To resolve this issue for deployment I exported the API key in a local `.env` file which was `.gitignore`d from source control. `create-react-app` supports reading from `.env` files at build time, so that while the public source code doesn't contain the API key, the final minified producion build does.

### Browser Support

The criteria for the technical asessent specified that the app should support IE10+ browsers. By default however `create-react-app` only supports IE11+. The fix was to include a set of polyfills for IE9+, which fill in the missing functionality of the newer features of the JavaScript language which IE9+ doesn't support.

## Third-party dependencies

I used the following third-party dependencies whilst developing this project:

- [create-react-app](https://create-react-app.dev/) (for boilerplating a React app without having to spend ages manually configuring Webpack, Babel etc).
- [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) (to provide the infinite scrolling functionality).
- [react-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component) (to ensure that the browser only tries to render images which are actually in view).
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner) (a library of loading spinners).
- [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill) (to allow the deployed build to support IE9+ browsers).
- [gh-pages](https://www.npmjs.com/package/gh-pages) (to enable deployment to GitHub Pages).

## Changes I'd have liked to make given more time

If I had a longer time to spend on this project, the following are additions which I'd consider working on (in no particular order):

- A more reliable photo grid structure. The current implementation can have issues if the user changes the browser width several times in quick succession whilst new content is still loading in. This can lead to some empty columns being rendered.
- More rigid bug hunting/fixing. Toward the end of development I spotted an odd bug, where the 'Nothing to show here' message was being rendered when there was indeed content to display. I couldn't reproduce it and couldn't see an obvious cause for it in the code, but I know that the bug is in there somewhere...
- Add a 'No more results' message when the end of the content is reached. I had an implementation of this working at one point, but it was flakely and unreliable, so I removed it. In its current form the loading spinner remains even when there is no more content to load, which may make it appear to the user as though the app is 'hanging/crashed'.
- A server component. While I considered the API key's security (as described above), the fact that the key is included in the minified production build is still a security concern, as it could be intercepted through the browser. Given more time I'd have liked to have submitted all requests to the Flickr API through a Node/Express server, which would have contained the API key as an environment variable within its hosting environment. This would have removed the posibility of a user intercepting the API key through the browser.

## Deployed Version

Please find the deployed version of this project hosted on GitHub Pages [here](https://bgrubb83.github.io/flickr-photo-stream/).