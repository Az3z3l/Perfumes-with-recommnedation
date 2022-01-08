const catchAsync = require("./../utils/catchAsync");
const Tokens = require("./../models/Token");
const ApiFeatures = require("./../utils/apiFeatures");
const fs = require("fs");

exports.createToken = catchAsync(async (req, res, next) => {
  const doc = await Tokens.create(req.body);
  console.log(doc);
  res.status(201).json({
    status: "ok",
    data: {
      "token":"Set",
    },
  });
});


exports.DeleteToken = async (req, res, next) => {
  const product = Tokens.find({ _id: req.body["id"] }).remove().exec();
  console.log(product);
  let state = 200;
  await res.status(state).json({
    status: "ok",
    data: {
      item: "deleted",
    },
  });
};



exports.GetUserDetails = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tokens.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();

  const docs = await features.query;

  res.json({
    status: 'ok',
    results: docs.length,
    data: { products: docs },
  });
});

exports.GetUserDetails2 = catchAsync(async (req, res, next) => {

  const features = new ApiFeatures(Tokens.find(), { tokenid: req.body["token"] })
    .filter()
    .sort()
    .paginate()
    .limitFields();
  console.log(features);
  const docs = await features.query;

  res.json({
    status: 'ok',
    data: { products: docs },
  });
});