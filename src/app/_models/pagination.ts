export interface Pagination{
    pageSize: number, 
    pageIndex: number,
    sorter?: Sorter
} 
export interface Sorter{
    dir: string,
    order: string
}
