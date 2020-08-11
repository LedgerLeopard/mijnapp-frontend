import React from "react";
import { Container, Button, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

function ArrangeYourself() {
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
      justifyContent:"cente"
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
      justifyContent: "center"
    },
    image: {
      marginLeft: "10px",
      marginTop: "3px",
      height: 20,
    },
    screenImage:{
        height: 350,
        width: 300,
        alignItems: "center"
    }
  }));

  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        container
        direction="column"
      >
        <Grid container alignItems="flex-start" >
          <Grid container >Welkomstour
          <Link href="login" float="Right">
              Overlaan
            </Link>
            </Grid>
        </Grid>
        <Grid container className={classes.wrapIcon}>
          <p>
            {/* <strong>Vinden</strong>
            
            <br />
            <img src="status-icon.png" alt="img" className={classes.image} /> Op een plek terecht kunnen voor je dienstverlening<br/>
            <img src="status-icon.png" alt="img" className={classes.image} />  Snel doorgelinkt worden naar betrouwbaar aanbod<br/>
            <img src="status-icon.png" alt="img" className={classes.image} /> Volledig af te stemmen op jouw persaanlijke voorkeuren */}

<strong>Je eigen dashboard</strong>
<p>Via het dashboard heb je altijd toegang tot al je gegevens, nieuwe berichten, overeenkomsten en gedeelde gegevens</p>
            </p>
        </Grid>
        <Grid container>
            <img src="screen2.png" alt="img" className={classes.screenImage}/>
        </Grid>
        <Grid container>
          <Button className={classes.buttonOrange}>Ga door naar inloggen <ArrowRightAltIcon/></Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ArrangeYourself;
