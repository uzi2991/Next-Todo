export const formatError = (error: any) => {
  if (error.name === 'ValidationError') {
    return error.errors.join('\n');
  }

  return 'Something went wrong, try again later';
};
