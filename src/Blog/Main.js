import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function Main(props) {
  const { title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Typography variant="h6" gutterBottom>
        <ul>
          <li>
            A Real time web hosted system connecting students, authorities and
            Mess facilities and introducing transparency amongst them
          </li>
          <li>Assuring Best quality of Food and Drinking water</li>
          <li>De - Monopolizing the influence of the Mess Facility</li>
          <li>
            Introducing healthy competition amongstdifferent food providers.
          </li>
        </ul>
      </Typography>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
