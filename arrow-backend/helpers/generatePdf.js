
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { numberToWords } from "./helpers.js";
const __dirname = path.resolve();

// Fonts and image paths
const fontPath = path.join(__dirname, "/fonts/segoeui.ttf");
const logoPath = path.join(__dirname, "/images/logo.png");
const headerPath = path.join(__dirname, "/images/header.jpeg");

export const generateInvoice = (order, user, filePath) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the output to a file
  doc.pipe(fs.createWriteStream(filePath));
  doc.font(fontPath);

  const extraY = 100;

  // Logo and Header
  doc
    .image(headerPath, 50, 45, {
      width: doc.page.width - 100,
      align: "center",
    })
    .fillColor("#444444")
    .fontSize(11)
    .text("Tax Invoice/Bill of Supply/Cash Memo", 50, 110 + extraY)
    .text("Original for Recipient", 50, 125 + extraY);

  doc
    .fontSize(11)
    .fillColor("#444444")
    .text(`Invoice no.: ${order._id}`, 350, 110 + extraY)
    .text(`Date: ${new Date().toLocaleDateString()}`, 350, 125 + extraY)
    .text(`Order ID: ${order._id}`, 350, 140 + extraY)
    .text(`Transaction ID: ${order.transactionId}`, 350, 155 + extraY);

  // Company Information
  const customerY = 180 + extraY;
  doc
    .fillColor("#000000")
    .fontSize(11)
    .text("Arrow Publications private limited", 50, customerY)
    .text("C-11 A & B, TSIIC, Moula-Ali,", 50, customerY + 15)
    .text("Hyderabad - 500 040", 50, customerY + 30)
    .text("Ph: 91009 99026, 27", 50, customerY + 45)
    .text("mail@arrowpublicationsindia.com", 50, customerY + 60)
    .text("GSTIN 36AAHCA3364M1ZE", 50, customerY + 75);

  // Customer Information (Right Side)
  let rightBlockY = customerY;
  doc.fontSize(11).fillColor("#000000");

  doc.text("Customer Name and Address", 350, rightBlockY);
  rightBlockY += 15;

  const nameText = `Name: ${user.name}`;
  doc.text(nameText, 350, rightBlockY);
  rightBlockY += doc.heightOfString(nameText, { width: 200 }) + 5;

  const addressText = `Address: ${order.address}`;
  const addressOptions = {
    width: 200,
    align: "left",
  };
  doc.text(addressText, 350, rightBlockY, addressOptions);
  rightBlockY += doc.heightOfString(addressText, addressOptions) + 5;

  const contactText = `Contact: ${order?.buyer?.phone}`;
  doc.text(contactText, 350, rightBlockY);
  rightBlockY += doc.heightOfString(contactText) + 5;

  // Set tableTop dynamically based on content height
  const tableTop = Math.max(rightBlockY + 30, customerY + 100);

  // Product Table Header
  doc
    .fontSize(12)
    .fillColor("#444444")
    .text("SR.", 50, tableTop)
    .text("PRODUCT NAME", 100, tableTop)
    .text("QTY", 300, tableTop)
    .text("RATE", 350, tableTop)
    .text("TOTAL AMT.", 450, tableTop);

  doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke();

  // Product List
  let position = tableTop + 25;
  order.products.forEach((product, index) => {
    const quantity = order?.quantities[index]?.quantity;
    const total = (quantity * product.price).toFixed(2);

    doc
      .text(index + 1, 50, position)
      .text(product.name, 100, position, { width: 180 }) // wrap product name
      .text(quantity, 300, position)
      .text(`Rs. ${product.price}`, 350, position)
      .text(`Rs. ${total}`, 450, position);

    position += 20;
  });

  doc.moveTo(50, position).lineTo(550, position).stroke();

  // Amount Details
  const amountY = position + 10;
  doc
    .fontSize(12)
    .text("Total Amount", 330, amountY)
    .text(
      `Rs. ${(order.payment + order.discount - order.shippingAmount).toFixed(2)}`,
      470,
      amountY
    )
    .text("Discount", 330, amountY + 15)
    .text(`Rs. ${order.discount}`, 470, amountY + 15)
    .text("Net Amount", 330, amountY + 30)
    .text(`Rs. ${(order.payment - order.shippingAmount).toFixed(2)}`, 470, amountY + 30)
    .text("Shipping Amount", 330, amountY + 45)
    .text(`Rs. ${order.shippingAmount}`, 470, amountY + 45)
    .text("Round-off", 330, amountY + 60)
    .text(`Rs. ${order.payment}`, 470, amountY + 60)
    .text("Payable amount", 330, amountY + 75)
    .text(`Rs. ${order.payment.toFixed(2)}`, 470, amountY + 75);

  // Amount in words
  const payableY = amountY + 110;
  doc
    .fontSize(12)
    .text("Amount payable in words:", 50, payableY)
    .text(`${numberToWords(order.payment)}`, 200, payableY);

  // Add footer only if enough space remains; otherwise, create new page
  const footerY = payableY + 50;
  if (footerY > doc.page.height - 50) {
    doc.addPage();
  }

  doc
    .fontSize(10)
    .text(
      "Your purchase means a lot to us! Enjoy your read and thank you again.",
      50,
      doc.page.height - 60,
      { align: "center", width: 500 }
    );

  doc.end();
};

