import React from 'react';
import { Container, Button, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function AlwaysSafe(props) {
    const handleLogin = () => {
        props.history.push("/login");
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
            justifyContent: "center"
        },
        image: {
            marginLeft: "10px",
            marginTop: "3px",
            height: 20,
        },
        screenImage: {
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
                    <strong>Altijd veilig</strong>
                    <br />
                    <p>
                    Alleen jij hebt toegang tot je eigen gegevens. Deze zijn vergrendeld via een pincode of biometrische scan.
                        </p>
                </Grid>
                <Grid container justifyContent="center">
                    <img src="/screen3.png" alt="img" className={classes.screenImage} />
                </Grid>
                <Grid container>
                    <Button className={classes.buttonOrange} onClick={handleLogin}>Go door naar inloggen
             <img src="/Arrow-forward-w.png" alt="img" /></Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AlwaysSafe;