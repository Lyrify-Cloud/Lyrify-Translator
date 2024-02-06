export function getErrorMessage(e: any): string {
  return (e as Error).message ?? "";
}
