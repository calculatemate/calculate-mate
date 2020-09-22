export default (src: string | null): string => {
  if (src !== null) {
    return src;
  }
  return '#';
};
