import {
  ForkKnife,
  Park,
  ShoppingBag,
  Circle,
  CaretRight,
  Bed,
  Buildings
} from '@phosphor-icons/react';
import { CategoryTree } from 'src/types/taxonomy/taxonomy';
import { ICategory, ISubCategory, ISubSubCategory, PhosphorIcons } from 'src/types/types';

export const getDateString = (unixTimestamp: string | undefined) => {
  if (!unixTimestamp) {
    return '';
  }
  const date = new Date(unixTimestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const extractWidthFromUrl = (url: string) => {
  const regex = /-w(\d+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return parseInt(match[1]);
  }

  return null;
};
export const generateCategoryTree = (
  categories: ICategory[],
  subcategories: ISubCategory[],
  subsubcategories: ISubSubCategory[]
) => {
  const categoryTree: CategoryTree = {};
  categories.forEach((category) => {
    categoryTree[category.label] = {
      id: category.id,
      level: 0,
      label: category.label,
      parent: null,
      subcategories: {},
      icon: category.icon
    };
    subcategories.forEach((subcategory) => {
      if (subcategory.parent === category.id) {
        categoryTree[category.label].subcategories[subcategory.label] = {
          id: subcategory.id,
          level: 1,
          label: subcategory.label,
          parent: subcategory.parent,
          subcategories: {},
          icon: ''
        };
        subsubcategories.forEach((subsubcategory) => {
          if (subsubcategory.parent === subcategory.id) {
            categoryTree[category.label].subcategories[subcategory.label].subcategories[
              subsubcategory.label
            ] = {
              id: subsubcategory.id,
              level: 2,
              parent: subsubcategory.parent,
              label: subsubcategory.label,
              icon: '',
              subcategories: null
            };
          }
        });
      }
    });
  });

  return categoryTree;
};
