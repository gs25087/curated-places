export type CategoryTreeSubSubCategory = {
  id: number;
  subcategories: null;
  label: string;
  level: number;
  parent: number;
  icon?: string;
};

export type CategoryTreeSubCategory = {
  id: number;
  label: string;
  subcategories: Record<string, CategoryTreeSubSubCategory>;
  level: number;
  parent: number;
  icon?: string;
};

export type CategoryTreeCategory = {
  id: number;
  label: string;
  subcategories: Record<string, CategoryTreeSubCategory>;
  level: number;
  parent: null;
  icon: string;
};

export type CategoryTree = Record<string, CategoryTreeCategory>;

export interface ISelectedTaxonomy {
  id: number | null;
  level: number | null;
}

export interface ICategoryNavTitleProps {
  title: string;
  selectedTaxonomy: ISelectedTaxonomy;
  setSelectedTaxonomy: (arg0: ISelectedTaxonomy) => void;
  setOpen: ((arg0: boolean) => void) | undefined;
}

export interface ICategoriesDialogProps {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
  setSelection: (selection: ISelectedTaxonomy | null) => void;
}
