export type SubSubCategory = {
  id: number;
  subcategories: null;

  label: string;
  level: number;
  parent: number;
  icon?: string;
};

export type SubCategory = {
  id: number;
  label: string;
  subcategories: Record<string, SubSubCategory>;
  level: number;
  parent: number;
  icon?: string;
};

export type Category = {
  id: number;
  label: string;
  subcategories: Record<string, SubCategory>;
  level: number;
  parent: null;
  icon: string;
};

export type CategoryTree = Record<string, Category>;

export interface ISelectedTaxonomy {
  id: number | null;
  level: number | null;
  parent: number | null;
}

export interface ICategoryNavTitleProps {
  title: string;
  selectedTaxonomy: ISelectedTaxonomy;
  setSelectedTaxonomy: (arg0: ISelectedTaxonomy) => void;
  setOpen: ((arg0: boolean) => void) | undefined;
}
