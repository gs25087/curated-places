//@ts-nocheck

import { useMapContext } from '@/context/MapContext/MapContext';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover
} from '@reach/combobox';
import React, { useEffect, useState } from 'react';
import '@reach/combobox/styles.css';
import { ITag } from 'src/types/types';

import styles from '@/styles/atoms/Input/Input.module.css';

export const TagField = ({ onSelectTags }) => {
  //@ts-ignore
  const { state } = useMapContext();
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (state.tags) {
      setTags(state.tags);
    }
  }, [state.tags]);

  function handleSelectTag(tag) {
    setInputValue(tag.label);
  }

  function handleAddTag() {
    // Find the selected tag by its label
    const selectedTag = tags.find((tag) => tag.label === inputValue);

    if (selectedTag) {
      // Add the selected tag to the array of selected tags
      onSelectTags([...selectedTags, selectedTag.id]);

      // Reset the input value
      setInputValue('');
    }
  }

  return (
    <div>
      <Combobox onSelect={handleSelectTag}>
        <ComboboxInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${styles.input} mb-2`}
        />
        <ComboboxPopover>
          <ComboboxList>
            {tags.map((tag) => (
              <ComboboxOption key={tag.id} value={tag.label} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <div>
        {selectedTags.map((tag) => (
          <span key={tag.id} className="mr-2 rounded bg-gray-200 px-2 py-1">
            {tag.label}
          </span>
        ))}
      </div>
      <button onClick={handleAddTag}>Add Tag</button>
    </div>
  );
};
