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

  const handleHome = () =>{
    props.history.push("/home");
  }
  const handleTest = () =>{
    props.history.push("/test");
  }
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
      background: 'url("splash-icon.png") no-repeat left bottom',
      backgroundColor: "#f9f9f9",
      height: "100vh",
      paddingLeft: "15px !important",
      paddingRight: "15px !important"
    },
    wrapIcon: {
      verticalAlign: "middle",
      marginTop:"95px",
      marginBottom:"188px",
    },
    buttonOrange: {
      backgroundColor: theme.palette.warning.dark + "!important",
      height: 40,
      width: '95%',
      textTransform: "none",
      marginTop:"2px",
      color: "white",
      fontWeight: "bold"
    },
    image:{
      marginLeft: '10px',
      marginTop:"3px",
      height: 35
    },
    displayflex: {
      display: "flex",
      width: "100%"
    }
  }));

  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container  direction="column" alignItems="center" justify="space-around">
      <Grid container className={classes.wrapIcon}>
        <p><h3 className="title">MijnApp</h3>
        <h5 className = "title_italic">Alles zelf regelem</h5></p>
      </Grid>
      <div className={classes.displayflex}>
          <Button className={classes.buttonOrange}>
            Test inloggein met DigiD
          </Button>
          <img src="digid logomark.png" alt="img" className={classes.image} />
        </div>
        <div className={classes.displayflex}>
          <Button className={classes.buttonOrange}>Inloggein met DigiD</Button>
          <img src="digid logomark.png" alt="img" className={classes.image} />
        </div>
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
