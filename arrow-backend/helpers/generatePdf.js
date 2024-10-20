import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const fontPath = path.join(__dirname, "/fonts/segoeui.ttf");

export const generateInvoice = (order, user, filePath) => {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the output to a file
  doc.pipe(fs.createWriteStream(filePath));
  doc.font(fontPath);
  // Add the header
  doc
    .image(path.join(__dirname, "/images/logo.png"), 50, 45, { width: 100 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Arrow Publications Pvt. Ltd", 110, 100)
    .fontSize(10)
    .text("Arrow Publications Pvt. Ltd", 200, 65, { align: "right" })
    .text("C-11 A & B, TSIIC, Moula-Ali,", 200, 80, {
      align: "right",
    })
    .text("Hydrabad, Telangana, 500 040", 200, 95, { align: "right" })
    .moveDown();

  // Add customer information
  doc
    .fillColor("#000000")
    .fontSize(12)
    .text(`Invoice to:`, 50, 160)
    .text(`${user.name}`, 50, 175)
    .text(`${order.address}`, 50, 190)
    .moveDown();

  // Invoice details
  doc
    .text(`Invoice Number: ${order._id}`, 50, 250)
    .text(`Date: ${new Date().toLocaleDateString()}`, 50, 265)
    .text(`Transaction ID: ${order.transactionId}`, 50, 280)
    .moveDown();

  // Table headers
  const tableTop = 330;
  doc
    .fontSize(12)
    .text("Product", 50, tableTop)
    .text("Quantity", 280, tableTop)
    .text("Price", 370, tableTop)
    .text("Total", 470, tableTop)
    .moveTo(50, tableTop + 20)
    .lineTo(550, tableTop + 20)
    .stroke();

  // Product list
  let position = tableTop + 30;
  order.products_name.forEach((productName, index) => {
    const quantity = order?.quantities[index]?.quantity;
    const price = (
      order.payment / order.quantities.reduce((acc, q) => acc + q.quantity, 0)
    ).toFixed(2);
    const total = (quantity * price).toFixed(2);

    doc
      .text(productName, 50, position)
      .text(quantity, 280, position)
      .text(`Rs. ${price}`, 370, position)
      .text(`Rs. ${total}`, 470, position);

    position += 20;
  });

  // Total amount
  doc
    .fontSize(12)
    .text("Total Amount", 370, position + 10)
    .text(`Rs. ${order.payment.toFixed(2)}`, 470, position + 10)
    .moveDown();

  // Footer
  doc.fontSize(10).text("Thank you for your purchase!", 50, 680, {
    align: "center",
    width: 500,
  });

  // End the document
  doc.end();
};
