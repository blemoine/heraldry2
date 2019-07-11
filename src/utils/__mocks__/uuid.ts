let inc: number = 0;

export function uuid(): string {
  return `${++inc}`;
}
