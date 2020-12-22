const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Users = require("./models/User");
const Mess = require("./models/Mess");
const cors = require("cors");
const Canteen = require("./models/Canteen");
const Grievance = require('./models/Grievance');

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:Mongo123@cluster0.rwl3p.mongodb.net/grievance-system?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected"))
  .catch((e) => {
    console.log(e);
  });

app.post("/signup", async (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const type = req.body.type;
  const password = req.body.password;

  const user = new Users({
    fName: fName,
    lName: lName,
    email: email,
    password: password,
    type: type,
  });
  try {
    await user.save();
    console.log("Data inserted");
  } catch (e) {
    console.log(e);
  }
});

app.post("/addmess", async (req, res) => {
  const name = req.body.name;
  const information = req.body.information;
  const openingTime = req.body.openingTime;
  const closingTime = req.body.closingTime;
  const pricePerMonth = req.body.pricePerMonth;
  const timetable = req.body.timetable;
  const location = req.body.location;
  const reviews = req.body.reviews;

  const mess = new Mess({
    name: name,
    information: information,
    openingTime: openingTime,
    closingTime: closingTime,
    pricePerMonth: pricePerMonth,
    location: location,
    timetable: timetable,
    reviews: reviews
  });
  try {
    await mess.save();
    res.status(200).send("Inserted ");
  } catch (e) {
    console.log(e);
  }
});

app.post("/addcanteen", async (req, res) => {
  const name = req.body.name;
  const information = req.body.information;
  const openingTime = req.body.openingTime;
  const closingTime = req.body.closingTime;
  const menu = req.body.menu;
  const location = req.body.location;

  const canteen = new Canteen({
    name: name,
    information: information,
    openingTime: openingTime,
    closingTime: closingTime,
    location: location,
    menu: menu,
  });
  try {
    await canteen.save();
    res.status(200).send("Inserted ");
  } catch (e) {
    console.log(e);
  }
});

app.post("/addgrievance", async (req, res) => {
  const title = req.body.title;
  const name = req.body.name;
  const body = req.body.body;
  const url = req.body.url;

  const grievance = new Grievance({
    title: title,
    name: name,
    body: body,
    url: url
  });
  try {
    await grievance.save();
    res.status(200).send("Inserted ");
  } catch (e) {
    console.log(e);
  }
});

app.get('/getgrievance', async (req, res)=>{
  await Grievance.find({}, (error, result)=>{
    if(error) console.log(error);
    else if(result) {
      console.log(result)
      res.status(200).send(result);
    };
  })
})

app.get("/updatecanteen/:id", (req, res) => {
  Canteen.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        menu: {
          no: "two",
          dish: "Dish2",
          price: "Rs 20",
        },
      },
    },
    { safe: true, upsert: true },
    (error, result) => {
      if (error) console.log(error);
      if (result) {
        console.log(result);
        res.json(result);
      }
    }
  );
});

app.get(`/findUser/:mail`, async (req, res) => {
  await Users.find({ email: req.params.mail }, (err, result) => {
    if (err) console.log(err);
    else if (result) {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/getmess", async (req, res) => {
  await Mess.find({}, (err, result) => {
    if (result) res.send(result);
    else if (err) console.log(err);
  });
});

app.post("/updatemess", async (req, res) => {
  await Mess.update(
    { _id: req.body.messid, "timetable._id": req.body.dayid },
    {
      $set: {
        "timetable.$.breakfast": req.body.breakfast,
        "timetable.$.lunch": req.body.lunch,
        "timetable.$.dinner": req.body.dinner,
      },
    },
    (error) => {
      if (error) console.log(error);
      else {
        console.log("Updated");
        res.send("Updated Re baghun ghe");
      }
    }
  );
});

app.get("/getcanteen", async (req, res) => {
  await Canteen.find({}, (err, result) => {
    if (result) res.send(result);
    else if (err) console.log(err);
  });
});

app.listen(5000, () => {
  console.log("Now Running on 5000");
});
