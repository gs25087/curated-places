import { useMapContext } from '@/context/MapContext/MapContext';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
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
import { useEffect, useState } from 'react';
import { ICategory, ITaxonomyBase, PhosphorIcons } from 'src/types/types';

export const CategoriesSelection = () => {
  //@ts-ignore
  const { state } = useMapContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (state.tags) {
      setCategories(state.tags);
    }
  }, [state.tags]);

  function renderIcon(iconName: string) {
    const PhosphorIcons: PhosphorIcons = {
      ForkKnife,
      Park,
      ShoppingBag,
      Circle,
      Bed,
      Buildings
    };
    if (PhosphorIcons[iconName]) {
      const IconComponent = PhosphorIcons[iconName];

      return <IconComponent size={24} weight="light" />;
    }
    // If the icon is not found in the PhosphorIcons library, it could be a custom icon.
    // You could handle it here by importing and rendering it dynamically as shown in my previous example.

    return <Circle size={22} weight="light" />;
  }

  return (
    <div className="fixed top-0 mx-auto -ml-[3rem] mt-notHomeNavHeight min-h-[theme(spacing.notHomeMain)] w-full max-w-full  bg-white md:max-w-md">
      <div className="py-pageMarginM px-pageMarginM">
        <input type="Search" placeholder="Search more categories" />

        <Divider />

        {selectedCategory && (
          <nav aria-label="main mailbox folders">
            <List>
              {categories.length > 0 &&
                categories.map((category: ITaxonomyBase) => (
                  <ListItem
                    key="category.id"
                    sx={{ paddingLeft: 0, paddingRight: 0 }}
                    disablePadding
                    onClick={() => setSelectedCategory(null)}
                  >
                    <ListItemButton sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <ListItemText primary={category.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </nav>
        )}
        {!selectedCategory && (
          <nav aria-label="main mailbox folders">
            <List>
              {categories.length > 0 &&
                categories.map((category: ICategory) => (
                  <ListItem
                    key="category.id"
                    disablePadding
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <ListItemButton sx={{ paddingLeft: 0, paddingRight: 0 }}>
                      <ListItemIcon>{renderIcon(category.icon)}</ListItemIcon>
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
