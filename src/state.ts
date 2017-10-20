export interface IItem {
    thumbnail: string;
    title: string;
    pubDate: Date;
    link: string;
}

export interface IFeed {
    feed: {
        title: string,
    };
    status: string;
    items: IItem[];
}

export interface IItemContent {
    loading?: boolean;
    invalid?: boolean;
    title?: string;
    content?: string;
}

export interface IRootState {
    appLoading: boolean;
    feedLoading: boolean;
    feeds: IFeed[];
    items: IItem[];
    content: IItemContent;
}
