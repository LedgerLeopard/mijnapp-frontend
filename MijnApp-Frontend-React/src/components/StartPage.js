import React from "react";
import { OutlinedInput, InputAdornment, Card, CardContent } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

function StartPage() {
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 0,
    },
    container: {
      backgroundColor: "#f9f9f9",
      height: "90vh",
    },
    input: {
      height: 40,
      width: "100%",
    },
    image: {
      marginLeft: "10px",
      marginTop: "3px",
      height: 50,
    },
    listContainer: {
      backgroundColor: "#ffffff",
      marginLeft:17,
      marginRight:13,
    },
    containerText: {
      fontSize: 16,
    },
    containersubText: {
      color: "orange",
      fontSize: 10,
    },
  }));

  const classes = useStyles();

  return (
    <Card
      className={classes.container}
    >
      <CardContent>
        <span className="search-title">Zoeken</span>
        <OutlinedInput
          className={classes.input}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </CardContent>
      <CardContent>
        <span>
          <strong>Mijn startpagina</strong>
        </span>
      </CardContent>
      <Card className={classes.container}>
        <CardContent className={classes.listContainer}>
          <span>
            <img
              src="Persoonsgegevens.png"
              alt="img"
              className={classes.image}
            />
          </span>
          <span className={classes.containerText}>
            <strong>Persoonsgege</strong>
          </span>
        </CardContent>
        <CardContent className={classes.listContainer}>
          <span>
            <img src="Berichten.png" alt="img" className={classes.image} />
          </span>
          <span className={classes.containerText}>
            <strong>Berichten</strong>
            <p className={classes.containersubText}>1 nieuw bericht</p>
          </span>
        </CardContent>
        <CardContent className={classes.listContainer}>
          <span>
            <img src="Overeenkomsten.png" alt="img" className={classes.image} />
          </span>
          <span className={classes.containerText}>
            <strong>Overeenkomsten</strong>
          </span>
        </CardContent>
        <CardContent className={classes.listContainer}>
          <span>
            <img src="Machtigingen.png" alt="img" className={classes.image} />
          </span>
          <span className={classes.containerText}>
            <strong>Gedeelde gegevens</strong>
          </span>
        </CardContent>
      </Card>
    </Card>
  );
}

export default StartPage;
