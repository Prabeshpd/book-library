# book-library

# Setup

- Requires Node 18 or above.

## Installation

Clone the repository, install the dependencies and get started right away. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```sh
git clone git@github.com:Prabeshpd/book-library.git
cd book-library
```

### Development

1. Install all dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Add environment variables

   ```bash
   cp .env.example .env
   ```

   Make sure to add the necessary environment variables

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Run the JSON server

   ```bash
   npm run json:server:start
   # or
   yarn json:server:start
   ```

5. Open http://localhost:3001 with your browser to see the result.

### Test

1. Unit test

   ```bash
   yarn test
   ```

2. UI Test

   ```bash
   yarn cypress:run
   ```

## RELEASE CONVENTION

[Release Convention](./RELEASE.md)

## Deploy

    For Deploy Netlify is used which is deployed by CD pipeline for each push to main branch. JSON server is hosted on render.

## Application Consideration

    - Book and user are maintained a many to many relationships.
    - BookUsers entity is used to currently map it from the json server
    - Json server auth is used for the authentication
    - Redux is used for the state management
    - Jest and React testing library are used for unit test
    - Cypress is used for end to end test
