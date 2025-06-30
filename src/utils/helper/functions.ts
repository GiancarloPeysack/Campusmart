export const formatTime = timestamp => {
  if (!timestamp) return '';

  const date =
    typeof timestamp.toDate === 'function'
      ? timestamp.toDate()
      : new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

  const now = new Date();
  const diffMs = now - date;

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};
