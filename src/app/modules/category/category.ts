export interface Category {
  id: string;
  title_FR: string;
  title_EN: string;
  status: string;
  parentId: string;
  isChecked?: boolean;
  children: Array<any> | null;
}
