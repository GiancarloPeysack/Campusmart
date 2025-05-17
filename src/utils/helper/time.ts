import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatRelativeTime = (time: Date) => {
  const relative = dayjs(time).fromNow();
  return relative;
};
