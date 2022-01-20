const catchAsync = require("./../utils/catchAsync");
const Product = require("./../models/Product");
const ApiFeatures = require("./../utils/apiFeatures");
const fs = require("fs");

const DIRECTORY = process.cwd() + "/client/public/assets/";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.createProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.create(req.body);

  res.status(201).json({
    status: "ok",
    data: {
      product: doc,
    },
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();

  const docs = await features.query;

  res.json({
    status: "ok",
    results: docs.length,
    data: { products: docs },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });

  res.status(200).json({
    status: "ok",
    data: {
      product,
    },
  });
});

exports.DeleteUser = async (req, res, next) => {
  const product = Product.find({ _id: req.body["id"] }).remove().exec();
  console.log("item deleted");
  console.log(product);
  let state = 200;
  await res.status(state).json({
    status: "ok",
    data: {
      item: "deleted",
    },
  });
};



exports.UploadProduct = catchAsync(async (req, res, next) => {
  console.log(DIRECTORY);
  let imgarr = [];
  const name = req.body["name"];
  const price = req.body["price"];
  const description = req.body["description"];
  const prodcode = req.body["prodcode"];
  const categroy = req.body["categroy"];
  const custtype = req.body["custtype"];
  const status = req.body["status"];
  const rating = req.body["rating"];
  const quantity= req.body['qty'].split(',');;
  const datas = req.body["data"];

  for (i = 0; i < datas.length; i++) {
    var string = datas[i]["data_url"];
    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var matches = string.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, "base64");
    const file_name = makeid(16) + "." + ext;
    fs.writeFileSync(DIRECTORY + file_name, buffer);
    imgarr.push("http://localhost:3000" + "/assets/" + file_name);
  }
  if(imgarr.length==0){
    imgarr=["https://i.insider.com/61135525ad63f30019501966?width=700","https://i.insider.com/61135525ad63f30019501966?width=700"]
  }
  const mongo = {
    name,
    price,
    description,
    sizes: quantity,
    prodcode,
    categroy,
    customerType: custtype,
    status,
    ratings: { total: rating, avg: 2, reviews: [] },
    images: imgarr,
  };
  const doc = await Product.create(mongo);
  console.log(doc);
  await res.status(200).json({
    status: "ok",
    data: {
      product: "req.body['data'][0]",
    },
  });
});

exports.EditProduct = catchAsync(async (req, res, next) => {
  console.log(DIRECTORY);
  let imgarr = [];
  const name = req.body["name"];
  const price = req.body["price"];
  const description = req.body["description"];
  const prodcode = req.body["prodcode"];
  const categroy = req.body["categroy"];
  const custtype = req.body["custtype"];
  const status = req.body["status"];
  const rating = req.body["rating"];
  const quantity= req.body['qty'].split(',');;

  const mongo = {
    name,
    price,
    description,
    sizes: quantity,
    prodcode,
    categroy,
    customerType: custtype,
    status,
    ratings: { total: rating, avg: 2, reviews: [] },
  };
  console.log(mongo);

  const doc = await Product.findOneAndUpdate({
    _id: req.body["id"],
  },{
    name: req.body['name'],
    price: price,
    description: description,
    sizes: quantity,
    categroy,
    customerType: custtype,
    status,
  });

  console.log(doc);
  await res.status(200).json({
    status: "ok",
    data: {
      product: "req.body['data'][0]",
    },
  });
});

