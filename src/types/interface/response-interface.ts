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
  | "NE";

interface CommonResponse {
  code: ResponseCode;
  message: string;
}

export interface LoginResponse extends CommonResponse {
  memberId: number;
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
  boardFileList: any;
  writeDatetime: string;
  tagList: string[];
  alarm: boolean;
}

export interface MyStudyGetResponse extends CommonResponse {
  searchList: MyStudy[];
}

export interface MyStudyDetailGetResponse extends CommonResponse, MyStudy {
  writeremail: string;
}
