export interface IAutionItem {
    title: string;
    desc: string;
    bid?: number;
    endBid?: number;
    images?: Array<string>;
    myMaxBid?: number;
    isFavorites?: boolean;
    externalId: string;
    Id: number;
    sortOrder: number;
}
