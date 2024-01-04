import { GrassList } from "../types/interface/response-interface";

export const arrayToHistoryArray = (array: GrassList[]) => {
  if (array?.length > 0) {
    const newData = array.map((el) => {
      return {
        count: el.postCount,
        date: el.grassDate,
      };
    });
    return newData;
  }

  return [];
};
