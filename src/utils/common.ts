export function removeProperty(obj: any, propToRemove: string) {
  // 객체를 복제하여 새로운 객체를 생성
  const { [propToRemove]: removedProp, ...rest } = obj;
  // 새로운 객체를 반환
  return rest;
}
