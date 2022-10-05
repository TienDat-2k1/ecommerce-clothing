import * as httpRequest from '../utils/httpRequest';
import catchAsync from '../utils/catchAsync';

export const getAllCategories = catchAsync(async () => {
  const res = await httpRequest.get('categories', {
    params: {},
  });

  return res.data;
});
