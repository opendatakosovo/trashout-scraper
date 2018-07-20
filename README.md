# trashout-scraper

A Node.js scraper that will do requests to scrape JSON data of all Kosovo Trash Reports in trashout.ngo.

## Technologies used:

- Server-side scripting: **NodeJS**
- Database: **MongoDB**
- API Request Library: **request-promise**
- Data Format: **JSON**

### Prerequisites

- Node

## Setup

**Note**: You have to get your API key from [trashout](http://www.trashout.ngo/) and then insert it in both scripts.

1.  Install dependencies

```
npm install
```

**Note**: The app contains two scrapers. You can run both of them using either the scrape.js or scrape-cluster.js as mentioned below.

1.  Run Server

```
node scrape.js
```

or

```
node scrape-cluster.js
```

Developed by **[Adonis Murati](https://github.com/adoi)**
