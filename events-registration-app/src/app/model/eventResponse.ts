import {Event} from "./event";

export interface EventResponse {
  totalCount: number,
  currentPage: number,
  pageSize: number,
  totalPages: number,
  events: Event[]
}
