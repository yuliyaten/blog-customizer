import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption.value);
 const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption.value);
 const [fontColor, setFontColor] = useState(defaultArticleState.fontColor.value);
 const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor.value);
 const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth.value);

	const apply = (newState: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
}) => {
		setFontFamily(newState.fontFamily);
		setFontSize(newState.fontSize);
		setFontColor(newState.fontColor);
		setBackgroundColor(newState.backgroundColor);
		setContentWidth(newState.contentWidth);
};

const reset = () => {
	setFontFamily(defaultArticleState.fontFamilyOption.value);
	setFontSize(defaultArticleState.fontSizeOption.value);
	setFontColor(defaultArticleState.fontColor.value);
	setBackgroundColor(defaultArticleState.backgroundColor.value);
	setContentWidth(defaultArticleState.contentWidth.value);
};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily,
					'--font-size': fontSize,
					'--font-color': fontColor,
					'--bg-color': backgroundColor,
					'--container-width': contentWidth,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={apply} onReset={reset} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
