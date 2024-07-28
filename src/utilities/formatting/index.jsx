export const formatTime = timeString => {
  const [hours, minutes] = timeString.split(':');
  const time = new Date();
  time.setHours(hours, minutes, 0, 0);
  return time.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
