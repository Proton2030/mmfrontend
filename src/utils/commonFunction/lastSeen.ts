export const getTimeAgo =(milliseconds:number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return days === 1 ? '1 d ago' : `${days} d ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 h ago' : `${hours} h ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
    } else {
      return 'just now';
    }
}
