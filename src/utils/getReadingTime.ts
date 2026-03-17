/** Estimates reading time for text content. Returns minutes (minimum 1). */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/** Returns word count for text content. */
export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}
