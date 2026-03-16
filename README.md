# WeeBoo | My Anime List

> **Development Repository**  
> This is the main development repository for WeeBoo. Contributors welcome!
> Legacy Repository: [React_Library](https://github.com/nantunggaputra/React_Library/tree/main/Frontend_React_by_WPU/anime-app)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

### WeeBoo from Anime-App

[WeeBoo | My Anime List](https://opensource-anime-app.vercel.app/) is a Front-End SPA (Single Page Application) Web project built using [React](https://react.dev/) to display a list of anime. This project uses [Vite](https://vitejs.dev/) for bundling and Visual Studio Code as the code editor. Mostly anime data is fetched from the [Jikan - Unofficial MyAnimeList API](https://docs.api.jikan.moe/).

WeeBoo is designed and developed by [Nantungga Putra](https://nantunggaputra.github.io/HTML/), also later dedicated development team under Open Source Contribution.

## Features (Under Development)

- Display anime list based on user searches.
- Search for anime by title.
- Provides anime by editor's choice, recommended category, genre, featured, nostalgic 2000s anime, and more.
- Detailed information about search results anime, including year of release, score, rating, status, synopsis, and more.
- Scrapes the website to satisfy the need for API functionality that MyAnimeList.net lacks.
- ...

## Technologies used

- **React**: For building dynamic user interfaces.
- **Vite**: For fast bundling of the application.
- **Jikan REST API v4**: For fetching anime data.
- **...**

## Installation

1.  Clone this repository:

    ```bash
    git clone https://github.com/nantunggaputra/anime-app.git
    cd anime-app
    ```

    Wee would prefer you not change anything other than the anime-app directory. Thank you.

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Run the application:

    ```bash
    pnpm run dev
    ```

    The application will run at [localhost:5173](http://localhost:5173).

4.  Build the application:

    ```bash
    pnpm run build:all
    ```

    The application will build at [localhost:3000/weeboo/index.html](http://localhost:3000/weeboo/index.html).

## Project Structure

The recommended project structure is as follows:

```
anime-app/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── config/
│ ├── service/
│ ├── App.css
│ ├── App.jsx
│ └── main.jsx
├── weeboo/ [Custom Build Output Directory]
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## Using the Jikan REST API v4

To use the Jikan REST API v4, you need to import and call the provided endpoints. Example of an API call to get the latest anime list:

```jsx
import axios from "axios";

const fetchAnime = async () => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    setTimeout(() => {
      alert(`${error}\nYour Error Message.`);
      window.location.reload();
    });
    return [];
  }
};
```

## Contributing

Wee welcome contributions. To contribute, follow these steps:

1.  Fork this repository.

2.  Create a new feature branch.

    ```bash
    git checkout -b your-feature
    ```

3.  Commit your changes.

    ```bash
    git commit -m 'Add new feature'
    ```

4.  Push to the branch.

    ```bash
    git push origin your-feature
    ```

5.  Create a Pull Request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

### Privacy Policy

Please read our [Privacy Policy](PRIVACY_POLICY.md) for details on how Wee handle your data.

### End-User Rights

Please read our [End-User Rights](RIGHTS.md) document for important information about your rights and obligations when using our application.

### Contact Information

If you have any questions or suggestions, please contact us at anggunnantunggaputra@gmail.com or send our developer message on [Nantungga Putra | LinkedIn](https://www.linkedin.com/in/nantungga-putra-451779116/) or create an [issue](https://github.com/nantunggaputra/anime-app/issues/) in this repository.
