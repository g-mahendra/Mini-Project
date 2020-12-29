import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { useData } from "../context/DataContext";
import backend from "../api/backend";

const UpdateForm = (props) => {
  const [value, setValue] = React.useState("Mess Owner");
  const [day, setDay] = useState("");
  const [breakfast, setbreakfast] = useState("");
  const [lunch, setlunch] = useState("");
  const [dinner, setdinner] = useState("");
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState("");
  const { mess } = props.location.state;
  const { updateComponent } = useData();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmitMess = async () => {
    const id = mess.timetable.find(
      (row) => row.day.toLowerCase() === day.toLowerCase()
    );
    const messid = mess._id;
    const dayid = id._id;

    try {
      const res = await backend.post(`/updatemess`, {
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        messid: messid,
        dayid: dayid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#eee",
        backgroundSize: "cover",
      }}
    >
      <Zoom in timeout={700}>
        <Paper
          elevation={20}
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography gutterBottom variant="h5" component="h5">
            Update Value
          </Typography>
          <Box>
            <FormControl component="fieldset">
              <RadioGroup
                style={{ display: "flex", flexDirection: "row" }}
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Mess Owner"
                  control={<Radio />}
                  label="Mess Owner"
                />
                <FormControlLabel
                  value="CanteenOwner"
                  control={<Radio />}
                  label="CanteenOwner"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {value === "Mess Owner" ? (
            <>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="day"
                  label="day"
                  id="day"
                  value={day}
                  placeholder="Enter a day of week"
                  onChange={({ target }) => setDay(target.value)}
                  margin="normal"
                />
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="breakfast"
                  label="breakfast"
                  id="breakfast"
                  value={breakfast}
                  placeholder="Enter breakfast dish"
                  onChange={({ target }) => setbreakfast(target.value)}
                  margin="normal"
                />
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="lunch"
                  label="lunch"
                  id="lunch"
                  value={lunch}
                  placeholder="Enter lunch dish"
                  onChange={({ target }) => setlunch(target.value)}
                  margin="normal"
                />
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="dinner"
                  label="dinner"
                  type="dinner"
                  id="dinner"
                  value={dinner}
                  placeholder="Enter dinner dish"
                  onChange={({ target }) => setdinner(target.value)}
                  margin="normal"
                />
              </Box>
              <Button
                style={{
                  padding: 10,
                  marginTop: 20,
                  backgroundColor: "#A0A",
                  color: "#FFF",
                }}
                onClick={() => {
                  handleSubmitMess();
                  updateComponent();
                }}
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Dish Name"
                  label="Dish Name"
                  id="Dish Name"
                  value={dish}
                  placeholder="Enter name of dish"
                  onChange={({ target }) => setDish(target.value)}
                  margin="normal"
                />
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Price"
                  label="Price"
                  id="Price"
                  value={price}
                  placeholder="Enter price of dish"
                  onChange={({ target }) => setPrice(target.value)}
                  margin="normal"
                />
              </Box>
              <Button
                style={{
                  padding: 10,
                  marginTop: 20,
                  backgroundColor: "#A0A",
                  color: "#FFF",
                }}
                onClick={handleSubmitCanteen}
              >
                Update
              </Button>
            </>
          )}
        </Paper>
      </Zoom>
    </Box>
  );
};

export default UpdateForm;
