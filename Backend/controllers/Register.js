const catchAsync = require("./../utils/catchAsync");
const users = require("./../models/Register");
const ApiFeatures = require('./../utils/apiFeatures');


exports.createUser = catchAsync(async (req, res, next) => {
  const doc = await users.create(req.body);
  const token = Buffer.from(doc["_id"].toString()).toString("base64")+"."+Buffer.from(doc["username"].toString()).toString("base64");
  console.log(token);
  res.status(201).json({
    status: "ok",
    data: {
      token,
    },
  });
});


exports.GetUserDetails = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(users.find(), req.query)
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


exports.getUser = catchAsync(async (req, res, next) => {
  const product = await users.findOne({
    email: req.body["email"],
    password: req.body["password"],
  });
  let status = "";
  let token = "";
  let state = 200;
  if (!product) {
    status = "error";
    token = NaN;
  } else {
    status = "ok";
    token = Buffer.from(product["_id"].toString()).toString("base64")+"."+Buffer.from(product["username"].toString()).toString("base64");
  }
  await res.status(state).json({
    status: status,
    data: {
      token,
    },
  });
});


exports.getAddress = catchAsync(async (req, res, next) => {
  const product = await users.findOne({
    email: req.body["email"],
    _id: req.body["id"],
  });
  let status = "";
  let address = "";
  let state = 200;
  if (!product) {
    status = "error";
    address = NaN;
  } else {
    status = "ok";
    address = product["address"].toString()
  }
  console.log(address)
  await res.status(state).json({
    status: status,
    data: {
      address,
    },
  });
});

exports.UpdatePass = catchAsync(async (req, res, next) => {
  const product = await users.findOneAndUpdate({
    email: req.body["email"],
    password: req.body["password"],
  },{
    password: req.body['newpassword']
  });
  
  let status = "";
  let token = "";
  let state = 200;
  if (!product) {
    status = "error";
    token = NaN;
  } else {
       status = "ok";
  }
  await res.status(state).json({
    status: status,
    data: {
    },
  });
});


exports.Address = catchAsync(async (req, res, next) => {
  const product = await users.findOneAndUpdate({
    email: req.body["email"],
    _id: req.body["id"],
  },{
    address: req.body['address']
  });
  
  let status = "";
  let token = "";
  let state = 200;
  if (!product) {
    status = "error";
    token = NaN;
  } else {
       status = "ok";
  }
  await res.status(state).json({
    status: status,
    data: {
    },
  });
});




