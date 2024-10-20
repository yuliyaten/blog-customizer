import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useState, useRef } from 'react';

export const ArticleParamsForm = ({ onApply, onReset }: { onApply: (state: any) => void; onReset: () => void }) => {
	const [isOpen, setState] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const toogle = () => { setState((prevState) => !prevState) };

	const [selectedFontFamily, FontFamily] = useState<OptionType>(fontFamilyOptions[0]);
	const [selectedFontSize, FontSize] = useState<OptionType>(fontSizeOptions[0]);
	const [selectedFontColor, FontColor] = useState<OptionType>(fontColors[0]);
	const [selectedBackgroundColor, BackgroundColor] = useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidth, ContentWidth] = useState<OptionType>(contentWidthArr[0]);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
				fontFamily: selectedFontFamily.value,
				fontSize: selectedFontSize.value,
				fontColor: selectedFontColor.value,
				backgroundColor: selectedBackgroundColor.value,
				contentWidth: selectedContentWidth.value,
		});
	};

	const reset = () => {
		FontFamily(fontFamilyOptions[0]);
		FontSize(fontSizeOptions[0]);
		FontColor(fontColors[0]);
		BackgroundColor(backgroundColors[0]);
		ContentWidth(contentWidthArr[0]);
		onReset();
};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setState,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toogle} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={submit}>
					<Select
						options={fontFamilyOptions}
						placeholder = "Выберите шрифт"
						selected={selectedFontFamily}
						onChange={FontFamily}
						onClose={() => setState(false)}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={FontSize}
						title='Размер шрифта'
						
					/>
					<Select
						options={fontColors}
						placeholder="Выберите цвет шрифта"
						selected={selectedFontColor}
						onChange={FontColor}
						onClose={() => setState(false)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder="Выберите цвет фона"
						selected={selectedBackgroundColor}
						onChange={BackgroundColor}
						onClose={() => setState(false)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder="Выберите ширину контента"
						selected={selectedContentWidth}
						onChange={ContentWidth}
						onClose={() => setState(false)}
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
