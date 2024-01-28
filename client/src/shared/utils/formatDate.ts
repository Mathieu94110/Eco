export function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("en-GB");
}
