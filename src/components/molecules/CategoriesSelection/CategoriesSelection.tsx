import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CaretRight } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Subcategory } from 'src/types/taxonomy/taxonomy';
import { ICategory, ISubCategory } from 'src/types/types';

export const CategoriesSelection = ({ setOpen }: { setOpen?: (arg0: boolean) => void }) => {
  const [categoryTree, setCategoryTree] = useState<ICategory[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubCategory[]>([]);
  const [subsubcategories, setSubsubcategories] = useState<ISubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  //@ts-ignore
  const { state, dispatch } = useMapContext<IMapContext>();

  useEffect(() => {
    if (state.categoryTree) {
      setCategoryTree(state.categoryTree);
    }
  }, [state.categoryTree]);

  useEffect(() => {
    if (state.categories) {
      setCategories(state.categories);
    }
  }, [state.categories]);

  useEffect(() => {
    if (state.subcategories) {
      setSubcategories(state.subcategories);
    }
  }, [state.subcategories]);

  useEffect(() => {
    if (state.subsubcategories) {
      setSubsubcategories(state.subsubcategories);
    }
  }, [state.subsubcategories]);

  const handleClick = (id: number, level: number) => {
    if (state?.taxonomy.id === id && state?.taxonomy.level === level) {
      dispatch({ type: ACTIONS.SET_TAXONOMY, payload: { id: null, level: null } });
    } else {
      dispatch({ type: ACTIONS.SET_TAXONOMY, payload: { id, level } });
    }
    if (setOpen) setOpen(false);
  };

  function findObjectById(obj: { [key: string]: any }, id: number) {
    const arr = Object.values(obj);

    return arr.find((obj) => obj.id === id);
  }
  function getSubcategories(categoryId: number): Subcategory[] {
    const category = findObjectById(categoryTree, categoryId);

    if (!category) return [];

    const subcategories = category.subcategories;
    if (!subcategories) return [];

    return Object.values(subcategories);
  }

  return (
    <div className="mt-notHomeNavHeight h-[theme(spacing.notHomeMain)] w-full max-w-full  bg-white md:max-w-md">
      <div className="py-pageMarginM px-pageMarginM">
        {selectedCategory && (
          <nav aria-label="szbcategories">
            <List>
              {selectedCategory &&
                getSubcategories(selectedCategory).map((subcategory: Subcategory) => {
                  return (
                    <ListItem
                      key={subcategory.id}
                      disablePadding
                      onClick={() => setSelectedCategory(null)}
                    >
                      <ListItemButton onClick={() => handleClick(subcategory.id, 1)}>
                        <ListItemText primary={subcategory.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </nav>
        )}
        {!selectedCategory && (
          <nav aria-label="main mailbox folders">
            <List>
              {categories.length > 0 &&
                categories.map((category: ICategory) => (
                  <ListItem
                    key={category.id}
                    disablePadding
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <ListItemButton sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <ListItemIcon>x</ListItemIcon>
                      <ListItemText primary={category.label} />
                      <IconButton aria-label="comment" sx={{ paddingRight: 0 }}>
                        <CaretRight size={22} weight="light" />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </nav>
        )}
      </div>
    </div>
  );
};
