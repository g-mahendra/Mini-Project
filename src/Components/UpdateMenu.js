import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import backend from "../api/backend";
import { useData } from "../context/DataContext";

const UpdateMenu = (props) => {
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState("");
  const { updateComponent } = useData();
  const { canteen } = props.location.state;

  const handleSubmitCanteen = async () => {
    const id = canteen.menu.find(
      (row) =>
        row.dish.replaceAll(" ", "").toLowerCase() ===
        dish.replaceAll(" ", "").toLowerCase()
    );
    const canteenid = canteen._id;
    const dishid = id._id;
    try {
      const res = await backend.post(`/updatedish`, {
        canteenid: canteenid,
        dishid: dishid,
        price: price,
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
              onClick={() => {
                handleSubmitCanteen();
                updateComponent();
              }}
            >
              Update
            </Button>
          </>
        </Paper>
      </Zoom>
    </Box>
  );
};

export default UpdateMenu;
