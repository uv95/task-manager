import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from '../../../../utils/classNames';
import './Button.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    PRIMARY = 'primary',
    OUTLINE = 'outline',
  }
    
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
}
    
export const Button:FC<ButtonProps> = (props: ButtonProps) => {
    const {
        className,
        theme,
        children,
        ...otherProps
    } = props;
    return (
        <button
            type='button'
            className={classNames('button', {}, [className || '', `button-${theme || ButtonTheme.CLEAR}`])}

            {...otherProps}
        >
            {children}
        </button>
    );
};