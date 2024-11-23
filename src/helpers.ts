export function isoToReadable(iso: string) {
  const date = new Date(iso);
  return `${date.getFullYear()}-${fix(date.getMonth() + 1)}-${fix(date.getDate())} ${fix(date.getHours())}:${fix(date.getMinutes())}`;
}

function fix(num: number): string {
  return num.toString().padStart(2, '0');
}
