# Overview

Game that lets users play Mad Libs with Donald Trump’s tweets by switching out word types.

# Technologies Used

* [NodeJS](https://nodejs.org/en/): Enables JavaScript to be used for server-side scripting, and runs scripts server-side to produce dynamic web page content before the page is sent to the user's web browser.
* [Express](https://expressjs.com/): S web application framework for Node.js that's designed for building web applications and APIs.
* [Pug](https://pugjs.org/api/getting-started.html): Server side templating engine used in NodeJS to create reusable front end code.
* [SASS](http://sass-lang.com/): A scripting language used to quickly create and compile CSS.

# Getting Started

## 1. Clone repository

```sh
git clone https://github.com/justincrich/LibTrump
cd ./LibTrump
```

## 2. Setup twitter API

Go to the ![twitter developers platform](https://dev.twitter.com/), signup, and create an application.

Be sure to create an access token while you are there.

## 3. Input API Info

Create a .env in ./LibTrump, enter the following information about your Twitter App in the following format:

```sh
TW_KEY= --YOUR-APP-CONSUMER-KEY--
TW_SECRET= --YOUR-APP-SECRET--
TW_TOKEN= --YOUR-APP-ACCESS-TOKEN-CONSUMER-KEY--
TW_TOKENSECRET= --YOUR-APP-ACCESS-TOKEN-CONSUMER-SECRET--
TW_CALLBACKURL= --YOUR-APP-CALLBACK-URL
```

## 4. Install dependencies & run locally

You're finished configuring the application, you're ready to run it:

```sh
npm install
npm start # open browser with: http://localhost:3000
```
