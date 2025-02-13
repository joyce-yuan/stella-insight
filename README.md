# Stella's Insights Dashboard
Stella's Insights Dashboard is a teacher analytics dashboard meant to be paired with the AppInventor App: [Stella](https://gallery.appinventor.mit.edu/?galleryid=d9837487-26ab-4df1-8ad6-47885a19a945).

## Demo
Find the video explanation [here](https://drive.google.com/file/d/12TxurbUTJcVo4gkCpqx5UnpkWco_GN0k/view?usp=sharing)

## Implementation
Stella's Insights Dashboard is a ReactJS App with a NodeJS server that uses Google Sheets as a backend. We use the [Material Kit - React](https://material-kit-react.devias.io/) as a starting point towards building the dashboard. 

![license](https://img.shields.io/badge/license-MIT-blue.svg)

[![Material Kit - React](https://github.com/devias-io/material-kit-react/blob/main/public/assets/thumbnail.png)](https://material-kit-react.devias.io/)


## Getting Started Locally
- first, you will need both a [Google Workspace with the Google Sheets API](https://developers.google.com/workspace/guides/get-started) and an [OpenAI API Key](https://platform.openai.com/docs/introduction).

	- download the Google Sheets API credentials and add it as `key.json` in the `server` folder

	- create a `.env` file in the `server` folder and insert your OpenAI API key as `REACT_APP_OPENAI_API_KEY="insert_key_here`

- repo: `git clone https://github.com/joyce-yuan/stella-insight.git`

- Make sure your Node.js and npm versions are up to date for `React 18`

- Install dependencies: `npm install` or `yarn`

- Start the React app: `npm run dev` or `yarn dev` in the root directory, views are on `localhost:3000`

- Start the Node JS server: `npm run dev` or `yarn dev` in the `server` directory, server runs on `localhost:8000`

## File Structure

Within the download you'll find the following directories and files:

```
stella-insights

┌── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── LICENSE.md
├── next.config.js
├── package.json
├── README.md
├── public
└── src
	├── components
	├── contexts
	├── guards
	├── hocs
	├── hooks
	├── layouts
	├── sections
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── companies.js
		├── customers.js
		├── index.js
		├── products.js
		└── settings.js
		└──  auth
			├── login.js
			└── register.js
```


## License

- Licensed under MIT (https://github.com/devias-io/react-material-dashboard/blob/master/LICENSE.md)

