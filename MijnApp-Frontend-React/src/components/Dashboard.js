import React from "react";
import { Container, Button, Grid, Link, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function Dashboard(props) {
  const handleAlwaysSafe = () => {
    props.history.push("/alwaysSafe");
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
      height: "100vh",
      justifyContent: "center",
    },
    wrapIcon: {
      verticalAlign: "middle",
    },
    buttonOrange: {
      backgroundColor: theme.palette.warning.dark + "!important",
      height: 40,
      width: "100%",
      marginLeft: "15px !important",
      marginRight: "15px !important",
      textTransform: "none",
      marginTop: "2px",
      color: "white",
      fontWeight: "bold",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container direction="column">
        <Grid
          container
          className="bg_white"
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item className="py_10">
            <span className="title">Welkomstour</span>
            <Link href="login" float="Right">
              {" "}
              <span className="float-right">Overlann</span>{" "}
            </Link>
          </Grid>
          <ul className="statusbar">
            <li className="active"></li>
            <li className="active"></li>
          </ul>
          {/* <Grid item className="py_10">
            <Link href="login" float="Right">
            
            </Link>
            </Grid> */}
        </Grid>
        <Box component="div" className="box_section">
          <Box className="box">
            <h3 className="title">Je eighen Dashboard</h3>
            <p>
              Via het dashboard heb je altijd toegang tot al je gegevens, nieuwe
              berichten, overeenkomsten en gedeelde gegevens
            </p>
          </Box>
          <Box component="div" className="text-center mt-15px">
            <img src="screen2.png" alt="img" className="phone_img" />
          </Box>
        </Box>

        <Grid className="button-bottom" container>
          <Button className={classes.buttonOrange} onClick={handleAlwaysSafe}>
            {" "}
            Volgende stap <ArrowRightAltIcon />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
