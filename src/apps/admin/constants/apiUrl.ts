export const apiUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080'
    : 'Need to put CloudRunApi url here';
