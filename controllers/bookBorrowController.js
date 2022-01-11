const Borrow = require("../models/bookBorrowModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const date = require("date-and-time");
const nodemailer = require("nodemailer");


/**
 *
 * @description : borrow book module
 */
exports.borrowBook = async (req, res, next) => {
  try {
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    let borrowQuantity = req.body.quantity;
    let borrowDate = req.body.borrowDate;
    let status = req.body.status;
    let returnDate;
    let noOfDays = 14;

    const now = new Date(borrowDate);
    returnDate = date.addDays(now, noOfDays);

    const newRecord = new Borrow({
      bookId: bookId,
      userId: userId,
      quantity: borrowQuantity,
      borrowDate: borrowDate,
      returnDate: returnDate,
      status: status,
    });

    if (borrowQuantity > 3) {
      res.status(400).send({
        status: 400,
        message: "Quatity Limit exceeds!!",
      });
    } else {
      let availableQuantity = Book.findById(bookId);
      availableQuantity.then((book) => {
        let oldQuantity = book.quantity;
        if (borrowQuantity > oldQuantity) {
          res.status(400).send({
            status: 400,
            message: "Requested Quantity not available!",
          });
        } else {
          console.log("oldQuantity", oldQuantity);
          let totalQuantity = 0;

          Borrow.find({ userId }, function (err, count) {
            Object.keys(count).forEach((key) => {
              totalQuantity += count[key].quantity;
            });

            let needQuantity = 3 - totalQuantity;
            console.log(needQuantity, "need");
            // return false;
            console.log(totalQuantity, "total quantity---");

            if (totalQuantity > 3 || borrowQuantity > needQuantity) {
              res.status(400).send({
                status: 400,
                message: "Limit exceeds!!",
              });
            } else {
              console.log("elligible to take book");
              // console.log(oldQuantity, "old_quantity");
              let newQuantity = oldQuantity - borrowQuantity;
              // console.log(newQuantity, "new_quantity");
              newRecord
                .save()
                .then(() => {
                  Book.findByIdAndUpdate(
                    bookId,
                    { quantity: newQuantity },
                    function (err, result) {
                      if (err) {
                        res.status(400).send({
                          status: 400,
                          message:
                            "unable to update quantity to database" + error,
                        });
                      } else {
                        console.log(result.quantity, "update respon");
                        res.status(200).send({
                          status: 200,
                          message: "Record Saved to database",
                        });
                      }
                    }
                  );
                })
                .catch((error) => {
                  res.status(400).send({
                    status: 400,
                    message: "unable to save to database" + error,
                  });
                });
            }
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @description : borrow User By Id
 */
exports.borrowHistoryByUserId = async (req, res, next) => {
  try {
    let userId = req.body.userId;

    // 1->asc, -1->desc
    Borrow.find({ userId: userId })
      .sort({ borrowDate: -1 })
      .then((result) => {
        res.status(200).send({
          status: 200,
          message: "Records are fetched successfully!",
          records: result,
        });
      });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @description : return book module
 */
exports.returnBook = async (req, res, next) => {
  try {
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    let borrowQuantity = req.body.quantity;
    let borrowDate = req.body.borrowDate;
    let status = req.body.status;
    let returnDate;
    let noOfDays = 14;

    const now = new Date(borrowDate);
    returnDate = date.addDays(now, noOfDays);

    const newRecord = new Borrow({
      bookId: bookId,
      userId: userId,
      quantity: borrowQuantity,
      borrowDate: borrowDate,
      returnDate: returnDate,
      status: status,
    });

    if (borrowQuantity > 3) {
      res.status(400).send({
        status: 400,
        message: "Quatity Limit exceeds!!",
      });
    } else {
      let availableQuantity = Book.findById(bookId);
      availableQuantity.then((book) => {
        let oldQuantity = book.quantity;
        if (borrowQuantity > oldQuantity) {
          res.status(400).send({
            status: 400,
            message: "Requested Quantity not available!",
          });
        } else {
          console.log("oldQuantity", oldQuantity);
          let totalQuantity = 0;

          Borrow.find({ userId }, function (err, count) {
            Object.keys(count).forEach((key) => {
              totalQuantity += count[key].quantity;
            });

            let needQuantity = 3 - totalQuantity;
            console.log(needQuantity, "need");
            // return false;
            console.log(totalQuantity, "total quantity---");

            if (totalQuantity > 3 || borrowQuantity > needQuantity) {
              res.status(400).send({
                status: 400,
                message: "Limit exceeds!!",
              });
            } else {
              console.log("elligible to take book");
              // console.log(oldQuantity, "old_quantity");
              let newQuantity = oldQuantity - borrowQuantity;
              // console.log(newQuantity, "new_quantity");
              newRecord
                .save()
                .then(() => {
                  Book.findByIdAndUpdate(
                    bookId,
                    { quantity: newQuantity },
                    function (err, result) {
                      if (err) {
                        res.status(400).send({
                          status: 400,
                          message:
                            "unable to update quantity to database" + error,
                        });
                      } else {
                        console.log(result.quantity, "update respon");
                        res.status(200).send({
                          status: 200,
                          message: "Record Saved to database",
                        });
                      }
                    }
                  );
                })
                .catch((error) => {
                  res.status(400).send({
                    status: 400,
                    message: "unable to save to database" + error,
                  });
                });
            }
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @description : send mail function
 */
exports.sendMail = async (req, res, next) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.Email, // generated ethereal user
      pass: process.env.Password, // generated ethereal password
    },
  });

  let messageBody =
    '<p>Hello!</p> <p>Congratulations, your registeration has been done successfully!  Please click the link below to verify your email address:</p> <a href="void(0)" style="color: blue" class="mail-buttom">Verify Email</a> <br> <p>If you did not create an account, no further action is required.</p> <p>Regards,<br>  WALKERHILL WORLDWIDE TRAVEL, INC </p> ';

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Map Development" <mapdev1800@gmail.com>', // sender address
    to: "wahill@yopmail.com", // list of receivers
    // to: "bar@example.com, wahill@yopmail.com", // list of receivers
    subject: "Registeration done successfully", // Subject line
    text: "Hello world", // plain text body
    html: messageBody, // html body
  });

  res.status(200).send({
    status: 200,
    message: "Message sent successfully: %s" + info.response,
  });
};

exports.payment = async (req, res, next) => {
  const stripe = require("stripe")(process.env.SECRET_KEY);
   stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Gourav Hammad",
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "452331",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 2500, // Charing Rs 25
        description: "Web Development Product",
        currency: "INR",
        customer: customer.id,
      });
    })
    .then((charge) => {
      // res.send({
      //   status: 200,
      //   message : "Success",
      //   result : charge,
      // }); // If no error occurs
      res.send("Success")
    })
    .catch((err) => {
      res.status(400).send({
        status : 400,
        message : "Error" + err
      }); // If some error occurs
    });
};
