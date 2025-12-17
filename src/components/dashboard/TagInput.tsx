import { Dispatch, SetStateAction } from 'react';
import {
    WithContext as ReactTags,
    SEPARATORS,
    type Tag
} from 'react-tag-input';

export default function TagInput({
    label,
    name,
    items,
    suggestions,
    setState
}: {
    label: string;
    name: string;
    items: Tag[];
    suggestions: Tag[];
    setState: Dispatch<SetStateAction<Tag[]>>;
}) {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold">{label}</span>

            <ReactTags
                id={label}
                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                placeholder="Add genres"
                tags={items}
                allowDragDrop={false}
                suggestions={suggestions}
                handleDelete={(index: number) => {
                    setState(items.filter((_, i) => i !== index));
                }}
                handleAddition={(item: Tag) => {
                    setState((prevItems) => {
                        return [...prevItems, item];
                    });
                }}
            />

            {items.map((item, i) => (
                <input
                    readOnly
                    key={i}
                    className="hidden"
                    type="checkbox"
                    checked
                    value={item.text}
                    name={name}
                />
            ))}
        </div>
    );
}
