const fs = require("fs");
const nodemailer = require("nodemailer");
const { getAdmins } = require('./controllers/UserController');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "milos.osto11@gmail.com",
    pass: process.env.PASSWORD,
  },
});


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

const sendMailToAdmin = async (book) => {
  let uploadPath="./csv/NovaKnjiga.csv"
  const writeStream = fs.createWriteStream(uploadPath);
  writeStream.write(`Naslov,  Opis,   Cijena,  Kolicina,   BrojStrana,  Slika\n${book.name}, ${book.description}, ${book.price}, ${book.quantity}, ${book.pages}, ${book.image}\n`);


  let admins = await getAdmins();
  console.log("test")
  console.log(admins);
  
  admins.forEach(admin => {
    var mailOptions = {
        from: 'milos.osto11@gmail.com',
        to: admin.email,
      subject: 'Information about New Book.',
       attachments: [
            {
              filename:"NewBook.csv",
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
