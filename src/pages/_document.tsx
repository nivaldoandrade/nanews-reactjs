import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="pt-br">
				<Head>
					<meta name="description" content="NA news é um blog sobre o mundo do ReactJS." />
					<meta name="keywords" content="ReactJS, React, Frontend, Front-end" />
					<meta name="language" content="Portuguese" />
					<meta name="author" content="Nivaldo ANdrade" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="shortcut icon" href="/favicon.png" type="image/png" />
					<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}