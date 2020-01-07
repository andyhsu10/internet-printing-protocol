var ipp = require("ipp");
var PDFDocument = require("pdfkit");

var doc = new PDFDocument;
doc.text("Date: 2020.01.07");
doc.text("Time: 20:17");
doc.text("Protocol Name: Internet Printing Protocol (IPP)");
doc.text("Author: M10709206 An-Ting Hsu");
doc.text("Course Name: CS5089701 Network Communication Protocols");

var buffers = [];
doc.on('data', buffers.push.bind(buffers));
doc.on('end', function () {

    console.log(Buffer.concat(buffers));

    var printer = ipp.Printer("http://140.118.109.212:631/ipp/print", {version:'1.0'});
    var file = {
        "operation-attributes-tag":{
            "requesting-user-name": "Andy Hsu",
        "job-name": "Print Job",
        "document-format": "application/octet-stream"
        },
        data: Buffer.concat(buffers)
    };

    printer.execute("Print-Job", file, function (err, res) {
        console.dir(res);
    });
});

doc.end();