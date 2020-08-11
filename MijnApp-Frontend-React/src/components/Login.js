import React from "react";
import {
  Grid,
  Button,
  Container,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import {setUserSession} from "./utils/common";

// import axios from 'axios';

function Login(props) {
  // const username = useFormInput("");
  // const password = useFormInput("");
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // handle button click of login form
  // const handleLogin = () => {
  //   // setError(null);
  //   // setLoading(true);
  //   props.history.push("/dashboard");
  //   // axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
  //   //   setLoading(false);
  //   //   setUserSession(response.data.token, response.data.user);
  //   //   props.history.push('/dashboard');
  //   // }).catch(error => {
  //   //   setLoading(false);
  //   //   if (error.response.status === 401) setError(error.response.data.message);
  //   //   else setError("Something went wrong. Please try again later.");
  //   // });
  // };

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop:0
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      backgroundImage: 'url("splash-icon.png")',
      backgroundRepeat: "no-repeat",
      backgroundColor: "#f9f9f9",
      height: "90vh",
    },
    wrapIcon: {
      verticalAlign: "middle",
      marginTop:"200px",
      marginBottom:"150px",
    },
    buttonOrange: {
      backgroundColor: theme.palette.warning.dark + "!important",
      height: 40,
      width: '90%',
      textTransform: "none",
      marginTop:"2px",
      color: "white",
      fontWeight: "bold"
    },
    image:{
      marginLeft: '10px',
      marginTop:"3px",
      height: 35
    }
  }));

  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container  direction="column" alignItems="center" justify="center">
      <Grid container className={classes.wrapIcon}>
        <p><strong>MijnApp</strong>
        <br />
        Alles zelf regelem</p>
      </Grid>
        <Grid container >
          <Button className={classes.buttonOrange}>
            Test inloggein met DigiD
          </Button>
          <img src="digid logomark.png" alt="img" className={classes.image} />
        </Grid>
        <Grid container >
          <Button className={classes.buttonOrange}>Inloggein met DigiD</Button>
          <img src="digid logomark.png" alt="img" className={classes.image} />
        </Grid>
        <br/>
        <Grid container>
        <p><strong>Heeft u nog geen DigiD?</strong><br/>
          Vraag uw DigiD aan op <Link href="www.gigid.nl">www.gigid.nl</Link></p>
        </Grid>
      </Grid>
    </Container>
  );
}

// const useFormInput = (initialValue) => {
//   const [value, setValue] = useState(initialValue);

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };
//   return {
//     value,
//     onChange: handleChange,
//   };
// };

export default Login;
