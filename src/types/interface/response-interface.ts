export type ResponseCode =
  | "VF"
  | "DE"
  | "DBE"
  | "SU"
  | "DE"
  | "NU"
  | "NB"
  | "SF"
  | "AF"
  | "NP"
  | "NE"
  | "PF"
  | "WT"
  | "NPF";

interface CommonResponse {
  code: ResponseCode;
  message: string;
}

export interface LoginResponse extends CommonResponse {
  userId: number;
  nickname: string;
  refreshToken: string;
  accessToken: string;
}

export interface RegisterResponse extends CommonResponse {}

export interface MyStudyPostResponse extends CommonResponse {}

export interface MyStudy {
  boardNumber: number;
  title: string;
  content: string;
  writeDatetime: string;
  alarm: boolean;
}

export interface MyStudyDetail extends MyStudy {
  boardFileList: any;
  tagList: string[];
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

interface NoOffsetBoardlist {
  content: MyStudy[];
  pageable: Pageable;
  number: number;
  size: number;
  sort: Sort;
  first: number;
  last: number;
  numberOfElements: number;
  empty: boolean;
}

export interface MyStudyGetResponse extends CommonResponse {
  noOffsetBoardlist: NoOffsetBoardlist;
}

export interface MyStudySearchResponse extends CommonResponse {
  searchList: MyStudy[];
}

export interface MyStudyDetailGetResponse extends CommonResponse, MyStudyDetail {
  writeremail: string;
}

export interface ProfileUserInfoResponse extends CommonResponse {
  email: string;
  nickname: string;
  profileImage: string | null;
}

type LatestStudy = Omit<MyStudy, "alarm" | "content"> & { tagList: string[] };

export interface LatestStudyResponse extends CommonResponse {
  latestBoardList: LatestStudy[];
}

export interface GrassList {
  postCount: number;
  grassDate: string;
}
export interface HistoryResponse extends CommonResponse {
  grassList: GrassList[];
}
