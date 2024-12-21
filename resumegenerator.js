const fs = require('fs');
const pdfDocument = require('pdfkit');

function generatePDF(data, res) {
    const doc = new pdfDocument();

    // Set the response headers for downloading the file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Resume.pdf"');

    // Pipe the generated PDF directly to the response
    doc.pipe(res);

    // Add user details to the PDF
    doc.font('Helvetica-Bold').fontSize(18).text('User Details:', { underline: true });
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(16).text(`Name: ${data.name || 'N/A'}`);
    doc.text(`Address: ${data.address || 'N/A'}`);
    doc.text(`Phone: ${data.phone || 'N/A'}`);
    doc.text(`Email: ${data.email || 'N/A'}`);
    doc.text(`Password: ${data.password || 'N/A'}`);
    doc.moveDown(1);

    // Add education details
    doc.font('Helvetica-Bold').fontSize(18).text('Education Details:', { underline: true });
    doc.moveDown(0.5);
    if (data.school || data.level || data.year) {
        doc.font('Helvetica').fontSize(16).text(`School: ${data.school || 'N/A'}`);
        doc.text(`Level: ${data.level || 'N/A'}`);
        doc.text(`Year: ${data.year || 'N/A'}`);
    } else {
        doc.font('Helvetica').fontSize(16).text('No education details provided.');
    }
    doc.moveDown(1);

    // Add working experience details
    doc.font('Helvetica-Bold').fontSize(18).text('Working Experience:', { underline: true });
    doc.moveDown(0.5);
    if (data.company || data.position || data.duties || data.work_year) {
        doc.font('Helvetica').fontSize(16).text(`Company: ${data.company || 'N/A'}`);
        doc.text(`Position: ${data.position || 'N/A'}`);
        doc.text(`Duties: ${data.duties || 'N/A'}`);
        doc.text(`Work Year: ${data.work_year || 'N/A'}`);
    } else {
        doc.font('Helvetica').fontSize(16).text('No working experience provided.');
    }
    doc.moveDown(1);

    // Add skills
    doc.font('Helvetica-Bold').fontSize(18).text('Skills:', { underline: true });
    doc.moveDown(0.5);
    if (data.skills) {
        const skillsArray = data.skills.split(','); // Assuming skills are entered as a comma-separated string
        skillsArray.forEach(skill => doc.font('Helvetica').fontSize(16).text(`- ${skill.trim()}`));
    } else {
        doc.font('Helvetica').fontSize(16).text('No skills provided.');
    }

    // Finalize the PDF
    doc.end();
}

module.exports = { generatePDF };