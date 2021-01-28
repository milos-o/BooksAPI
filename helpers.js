const fs = require("fs");
const nodemailer = require("nodemailer");
const { getAllAdmins } = require('./controllers/UserController');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "milos.osto11@gmail.com",
    pass: process.env.PASSWORD,
  },
});

const writeStream = fs.createWriteStream("NovaKnjiga.csv");
writeStream.write(`Naslov,  Opis,   Cijena,  Kolicina,   BrojStrana,  Slika\n`);

const verifyToken = (req, res, next) => {
  // Get auth header value- zato sto se kroz Header salje token
  const bearerHeader = req.headers["authorization"];
  console.log(typeof bearerHeader);
  // check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at space
    const bearer = bearerHeader.split(" ");
    // get token
    const bearerToken = bearer[1];
    // set token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    console.log("error");
    res.sendStatus(403);
  }
};

const sendMailToAdmin = (book) => {
  writeStream.write(
    `${book.name}, ${book.description}, ${book.price}, ${book.quantity}, ${book.pages}, ${book.image}\n`
  );

  const admins = getAllAdmins();
  admins.forEach(admin => {
    var mailOptions = {
        from: 'milos.osto11@gmail.com',
        to: admin.email,
      subject: 'Information about New Book.',
       attachments: [
            {
              path: uploadPath
           }
        ]
      };
   
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          transport.close();
        }
      });
  });

};

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.send("You are not logged in!");
}

module.exports = {
  verifyToken,
  sendMailToAdmin,
  checkAuthenticated
};
