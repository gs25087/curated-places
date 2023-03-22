type Subsubcategory = {
  id: number;
  label: string;
};

export type Subcategory = {
  id: number;
  label: string;
  subsubcategories: Record<string, Subsubcategory>;
};

type Category = {
  id: number;
  label: string;
  subcategories: Record<string, Subcategory>;
};

export type CategoryTree = Record<string, Category>;
