import { useMapContext } from '@/context/MapContext/MapContext';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  CaretRight as ArrowRightIcon,
  CaretLeft as ArrowBackIcon,
  X as CloseIcon
} from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import {
  CategoryTreeCategory,
  CategoryTreeSubCategory,
  CategoryTreeSubSubCategory,
  ICategoriesDialogProps
} from 'src/types/taxonomy/taxonomy';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CategoriesDialog: React.FC<ICategoriesDialogProps> = ({
  setOpen,
  open,
  setSelection
}) => {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentParent, setCurrentParent] = useState<number | null>(null);

  //@ts-ignore
  const { state } = useMapContext<IMapContext>();
  const { categoryTree } = state;
  const [currentCategories, setCurrentCategories] = useState<any>({});

  useEffect(() => {
    if (open) {
      setCurrentCategories(categoryTree);
    }
  }, [categoryTree, open]);

  const restoreCategories = () => {
    setCurrentLevel(0);
    setCurrentParent(null);
    setCurrentCategories(categoryTree);
  };

  useEffect(() => {
    if (!open) {
      restoreCategories();
    }
  }, [open]);

  const handleCategoryClick = (
    category: CategoryTreeCategory | CategoryTreeSubCategory | CategoryTreeSubSubCategory
  ) => {
    if (category.subcategories && Object.keys(category.subcategories).length > 0) {
      setCurrentLevel(category.level + 1);
      setCurrentParent(category.id);
      setCurrentCategories(category.subcategories);
    } else {
      setSelection({ id: category.id, level: category.level });
      setOpen(false);
      restoreCategories();
    }
  };

  const handleBackClick = () => {
    if (currentLevel === 0) {
      restoreCategories();
      setOpen(false);
    } else {
      setCurrentLevel(currentLevel - 1);
      const parentCategory = Object.values(categoryTree).find(
        (category: any) => category.id === currentParent
      );

      //@ts-ignore
      setCurrentParent(parentCategory?.parent ?? null);
      setCurrentCategories(
        //@ts-ignore
        parentCategory?.level === 0 ? categoryTree : parentCategory?.subcategories
      );
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-labelledby="taxonomy-dialog-title"
      aria-describedby="taxonomy-dialog-description"
    >
      <DialogTitle>
        <IconButton edge="start" color="inherit" onClick={handleBackClick} sx={{ mr: 2 }}>
          {currentLevel === 0 ? <CloseIcon /> : <ArrowBackIcon />}
        </IconButton>
        Categories
      </DialogTitle>
      <List>
        {Object.values(currentCategories).map((category: any) => (
          <ListItem key={category.id} onClick={() => handleCategoryClick(category)}>
            <ListItemText primary={category.label} />
            {category.subcategories && Object.keys(category.subcategories).length > 0 && (
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
            )}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
