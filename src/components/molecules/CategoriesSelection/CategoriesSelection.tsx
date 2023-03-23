import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  ForkKnife,
  Park,
  ShoppingBag,
  Circle,
  CaretRight,
  Bed,
  Buildings
} from '@phosphor-icons/react';
import { useState } from 'react';
import {
  Category,
  CategoryTree,
  ISelectedTaxonomy,
  SubCategory,
  SubSubCategory
} from 'src/types/taxonomy/taxonomy';
import { PhosphorIcons } from 'src/types/types';

import { CategoryNavTitle } from '../CategoryNavTitle';

export const CategoriesSelection = ({ setOpen }: { setOpen?: (arg0: boolean) => void }) => {
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<{
    id: number | null;
    level: number | null;
    parent: number | null;
  }>({ id: null, level: null, parent: null });

  //@ts-ignore
  const { state, dispatch } = useMapContext<IMapContext>();
  const { categoryTree } = state;

  function getCategoryByIdAndLevel(tree: CategoryTree, id: number | null, level: number | null) {
    for (const category of Object.values(tree)) {
      if (category.id === id && category.level === level) {
        return category;
      }
      for (const subcategory of Object.values(category.subcategories)) {
        if (subcategory.id === id && subcategory.level === level) {
          return subcategory;
        }
        for (const subsubcategory of Object.values(subcategory.subcategories)) {
          if (subsubcategory.id === id && subsubcategory.level === level) {
            return subsubcategory;
          }
        }
      }
    }

    return null;
  }

  function getCategorySubcategories(
    categoryTree: CategoryTree,
    selectedTax: ISelectedTaxonomy
  ): Category[] | SubCategory[] | SubSubCategory[] {
    if (selectedTax.id === null && selectedTax.level === null) {
      return Object.values(categoryTree);
    }
    const category = getCategoryByIdAndLevel(categoryTree, selectedTax.id, selectedTax.level);
    if (!category) return [];

    const subcategories = category.subcategories;
    if (!subcategories || Object.keys(subcategories).length === 0) {
      setSelectedTaxonomy({ id: null, level: null, parent: 0 });
      if (setOpen) setOpen(false);

      if (state?.taxonomy.id !== selectedTax.id && state?.taxonomy.level !== selectedTax.level) {
        dispatch({
          type: ACTIONS.SET_TAXONOMY,
          payload: { id: selectedTax.id, level: selectedTax.level }
        });
      }

      return [];
    }

    return Object.values(subcategories);
  }

  function renderIcon(iconName: string) {
    const PhosphorIcons: PhosphorIcons = {
      ForkKnife,
      Park,
      ShoppingBag,
      Circle,
      Bed,
      Buildings,
      CaretRight
    };
    if (PhosphorIcons[iconName]) {
      const IconComponent = PhosphorIcons[iconName];

      return <IconComponent size={24} weight="light" />;
    }

    return <Circle size={22} weight="light" />;
  }

  return (
    <div className=" h-[theme(spacing.notHomeMain)] w-full max-w-full  bg-white md:max-w-md">
      <CategoryNavTitle
        title={'Categories'}
        selectedTaxonomy={selectedTaxonomy}
        setSelectedTaxonomy={setSelectedTaxonomy}
        setOpen={setOpen}
      />
      <Divider />
      <div className="py-pageMarginM px-pageMarginM">
        <nav aria-label="main mailbox folders">
          <List>
            {getCategorySubcategories(categoryTree, selectedTaxonomy) &&
              getCategorySubcategories(categoryTree, selectedTaxonomy).length > 0 &&
              getCategorySubcategories(categoryTree, selectedTaxonomy).map(
                (category: Category | SubCategory | SubSubCategory) => {
                  return (
                    <ListItem
                      key={category.id}
                      disablePadding
                      onClick={() => {
                        setSelectedTaxonomy({
                          id: category.id,
                          level: category.level,
                          parent: category.parent
                        });
                      }}
                    >
                      <ListItemButton sx={{ paddingLeft: 0, paddingRight: 0 }}>
                        {category.icon && <ListItemIcon>{renderIcon(category.icon)}</ListItemIcon>}
                        <ListItemText primary={category.label} />
                        <IconButton aria-label="comment" sx={{ paddingRight: 0 }}>
                          {category?.subcategories &&
                            Object.keys(category?.subcategories)?.length > 0 && (
                              <CaretRight size={22} weight="light" />
                            )}
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  );
                }
              )}
          </List>
        </nav>
      </div>
    </div>
  );
};
