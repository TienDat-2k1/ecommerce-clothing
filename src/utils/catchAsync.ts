const catchAsync = (fn: Function) => {
  return () => fn().catch((err: any) => console.log(err));
};

export default catchAsync;
