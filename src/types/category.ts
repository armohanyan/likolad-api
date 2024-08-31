export interface ICategory {
    id: number;
    title_am: string;
    title_en: string;
    description_am?: string;
    description_en?: string;
    parentId?: number;
}