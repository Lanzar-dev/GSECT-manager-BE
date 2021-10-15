export const privateInfo = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You are authorized to access this route",
  });
};
