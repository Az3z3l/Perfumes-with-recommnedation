const catchAsync = require("./../utils/catchAsync");
const Orders = require("./../models/Orders");
const Product = require("./../models/Product");
const ApiFeatures = require("./../utils/apiFeatures");
const fs = require("fs");
const PDFDocument = require('pdfkit');

exports.getOrders = catchAsync(async (req, res, next) => {
  const product = await Orders.find({ }).sort({"created": -1});
  res.status(201).json({
    status: "ok",
    data: {
        product
    },
  });
});

///home/nikhil/Company/perfume/shopping-cart/client/public/assets/zfqab-8s7fy.pdf
exports.PdfGen = catchAsync(async (req, res, next) => {

const product = await Orders.find({ }).sort({"created": -1}).limit(5);
const ratings= await Product.find({},{_id:0,__v:0}).sort({"ratings.total":-1}).limit(5);
const data2={}
product.map((x,y)=>{
  x.products.map((i,j)=>{
    data2[i.name]=(data2[i.name] || 0) + 1;
  })
})
myArrayOfItems=[]
Object.keys(data2).forEach(function(key) {
  myArrayOfItems.push('Item Name : ' + key + '  quantity : ' + data2[key])
})

prodname=[]
ratings.map((i,y)=>{
prodname.push("Product Name"+i.name+" ratings:"+i.ratings['total'])
})

console.log(ratings);

let pdfDoc = new PDFDocument();
res.setHeader("Content-Type", "application/pdf");
res.setHeader("Content-Disposition", `inline; filename=lists.pdf`);
pdfDoc.pipe(fs.createWriteStream('lists.pdf'));
pdfDoc.pipe(res);
  pdfDoc
    .image("./client/public/logo192.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("SD PERFUMERY", 110, 57)
    .fontSize(10)
    .text("xxxxxx", 200, 65, { align: "right" })
    .text("Srilanka, SL, 10025", 200, 80, { align: "right" })
pdfDoc.fontSize(40).fillColor('red').text('MOST RECENTLY BOUGHT ITEMS', 100, 200);
pdfDoc.fontSize(15).fillColor('black').list(myArrayOfItems);
pdfDoc.addPage()
pdfDoc.fontSize(30).fillColor('blue').text('Top Items by ratings', 100, 100);
pdfDoc.fontSize(15).fillColor('black').list(prodname);
pdfDoc.end();
// const doc = new PDFDocument();
  
// // Saving the pdf file in root directory.
// doc.pipe(fs.createWriteStream('example.pdf'));
  
// // Adding functionality
// doc
   
//   .fontSize(27)
//   .text('This the article for GeeksforGeeks', 100, 100);
  
// // Adding image in the pdf.
  
//   doc
//   .addPage()
//   .fontSize(15)
//   .text('Generating PDF with the help of pdfkit', 100, 100);
   
  
   
// // Apply some transforms and render an SVG path with the 
// // 'even-odd' fill rule
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();
   
// // Add some text with annotations
// doc
//   .addPage()
//   .fillColor('blue')
//   .text('The link for GeeksforGeeks website', 100, 100)
    
//   .link(100, 100, 160, 27, 'https://www.geeksforgeeks.org/');
   
// // Finalize PDF file
// doc.end();

});


exports.Order = catchAsync(async (req, res, next) => {
  const doc = await Orders.create(req.body);
  console.log(doc);
   await res.status(200).json({
    status: "ok",
    data: {
      product: "req.body['data'][0]",
    },
  });
});

