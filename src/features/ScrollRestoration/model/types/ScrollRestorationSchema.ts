// <page address, scroll position>
export type ScrollSchema = Record<string, number>;

export interface ScrollRestorationSchema {
    scroll: ScrollSchema;
}