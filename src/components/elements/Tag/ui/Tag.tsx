import './Tag.scss';

export enum TagTheme {
    STATUS = 'status',
    PRIORITY = 'priority',
}

export enum TagSize {
    L = 'size_l',
    S = 'size_s',
}
    
interface TagProps {
    text: string
    theme: TagTheme
    size: TagSize
}
    
export const Tag = ({ text, theme, size}: TagProps) => {
    return (
        <div className={`tag tag-${size} tag-${theme} tag-${theme}--${text} `}>
            {text}
        </div>
    );
};