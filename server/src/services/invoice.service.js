import PDFDocument from 'pdfkit';

export function createInvoicePdf(order) {
  const doc = new PDFDocument({ margin: 48, size: 'A4' });
  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));

  doc.fillColor('#0B0B0C').fontSize(24).text('NOIRTHREAD');
  doc.moveDown().fontSize(12).fillColor('#444').text(`Invoice ${order.invoice?.number || order._id}`);
  doc.moveDown();
  doc.fontSize(14).fillColor('#111').text('Customer');
  doc.fontSize(10).fillColor('#555').text(order.shippingAddress?.name || 'Private client');
  doc.moveDown();
  order.items.forEach((item) => {
    doc.fillColor('#111').text(`${item.title} (${item.sku}) x ${item.quantity}`);
    doc.fillColor('#555').text(`$${(item.price * item.quantity).toFixed(2)}`);
  });
  doc.moveDown();
  doc.fillColor('#111').fontSize(14).text(`Tax: $${order.totals.tax.toFixed(2)}`);
  doc.text(`Shipping: $${order.totals.shipping.toFixed(2)}`);
  doc.text(`Total: $${order.totals.grandTotal.toFixed(2)}`);
  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
