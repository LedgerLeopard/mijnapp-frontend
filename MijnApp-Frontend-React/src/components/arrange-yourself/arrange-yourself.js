import React from "react";
import { Container, Button, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function ArrangeYourself(props) {
  const handleDashboard = () => {
    props.history.push("/dashboard");
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      backgroundColor: "#f9f9f9",
      height: "90vh",
    },
    wrapIcon: {
      verticalAlign: "middle",
    },
    buttonOrange: {
      backgroundColor: theme.palette.warning.dark + "!important",
      height: 40,
      width: "95%",
      textTransform: "none",
      marginTop: "2px",
      color: "white",
      fontWeight: "bold",
      justifyContent: "center",
    },
    image: {
      marginLeft: "10px",
      marginTop: "3px",
      height: 20,
    },
    screenImage: {
      height: 350,
      width: 300,
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        container
        flexGrow="1"
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid>
          <span className="mui--pull-left">Welkomstour</span>
          <span className="mui--pull-right">
            <Link href="login" className="link">
              Overlaan
            </Link>
          </span>
        </Grid>
        <Grid container className={classes.wrapIcon}>
          <strong>Alles zelf regelen</strong>
          <br />
          <p>
            Via MijnApp kun je gemakkelijk bijvoorbeeld een verhuizing
            doorgeven, een huwelijk partnerschap aangaan, ondersteuning
            aanvragen en veel meer.
          </p>
        </Grid>
        <Grid container justifyContent="center">
          <img src="/screen1.png" alt="img" className={classes.screenImage} />
        </Grid>
        <Grid container>
          <Button className={classes.buttonOrange} onClick={handleDashboard}>
            Volgende stap
            <ArrowRightAltIcon />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ArrangeYourself;
