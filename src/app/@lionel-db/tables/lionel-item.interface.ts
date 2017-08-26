export interface ILionelItem {
    lionelId: string;
    title: string;
    desc?: string;
    images: Array<string> | string;
    categoryId: number;
    categoryBySource?: string;
    lionelExternalId: string;
    lionelPartId?: string;
    lionelEraId: number;
}
