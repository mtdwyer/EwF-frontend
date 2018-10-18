import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    marginRight: 20,
    height: 500,
    width: 350,
    marginTop: 30,
    textAlign: "-webkit-centerd"
    // display: "flex",
    // justifycontent: "space-between",
  },
  media: {
    height: 200,
    marginRight: 0
    // display: "flex",
    // justify: "center"
    // alignContent: "flex-end",
    // alignContent: "flex-end"
  }
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Card
        className={classes.card}
        // margin="30px"
        // maxwidth="70%"
        // maxheight="70%"
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="display2" component="h2">
              UserName
            </Typography>
            <Typography component="p">User description</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          {/* <Button size="small" color="primary" justify="center">
          Learn More
        </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
