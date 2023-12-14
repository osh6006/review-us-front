export interface RegistFormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface MyStudyFormData {
  title: string;
  content: string;
  boardFileList?: string[];
  tagList: string[];
  alarm: boolean;
}
