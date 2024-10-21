import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useState, useRef } from 'react';

export const ArticleParamsForm = ({ onApply, onReset }: { onApply: (state: any) => void; onReset: () => void }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const toogle = () => { setIsMenuOpen((prevState) => !prevState) };

 const [articleState, setArticleState] = useState(defaultArticleState);

	const selectChange = (key: keyof typeof articleState, value: OptionType) => {
		setArticleState((prevState) => ({ ...prevState, [key]: value }));
};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
				fontFamily: articleState.fontFamilyOption.value,
				fontSize: articleState.fontSizeOption.value,
				fontColor: articleState.fontColor.value,
				backgroundColor: articleState.backgroundColor.value,
				contentWidth: articleState.contentWidth.value,
		});
	};

	const reset = () => {
		setArticleState(defaultArticleState);
		onReset();
};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toogle} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form className={styles.form} onSubmit={submit}>
					<Select
						options={fontFamilyOptions}
						placeholder = "Выберите шрифт"
						selected={articleState.fontFamilyOption}
						onChange={(value) => selectChange('fontFamilyOption', value)}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(value) => selectChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						placeholder="Выберите цвет шрифта"
						selected={articleState.fontColor}
						onChange={(value) => selectChange('fontColor', value)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder="Выберите цвет фона"
						selected={articleState.backgroundColor}
						onChange={(value) => selectChange('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder="Выберите ширину контента"
						selected={articleState.contentWidth}
						onChange={(value) => selectChange('contentWidth', value)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={reset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
