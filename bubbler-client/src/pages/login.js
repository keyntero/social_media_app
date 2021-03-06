import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/main_logo.png";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({ ...theme.myClasses });

export class login extends Component {
   constructor() {
      super();
      this.state = {
         email: "",
         password: "",
         errors: {},
      };
   }
   handleSubmit = (event) => {
      event.preventDefault();
      const userData = {
         email: this.state.email,
         password: this.state.password,
      };
      this.props.loginUser(userData, this.props.history);
   };

   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   render() {
      const {
         classes,
         UI: { loading, errors },
      } = this.props;
      return (
         <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
               <img src={AppIcon} alt="Bubble Icon" className={classes.image} />
               <Typography variant="h3" className={classes.pageTitle}>
                  Login
               </Typography>
               <form noValidate onSubmit={this.handleSubmit}>
                  <TextField
                     id="email"
                     name="email"
                     type="email"
                     label="Email"
                     className={classes.textField}
                     value={this.state.email}
                     onChange={this.handleChange}
                     fullWidth
                     helperText={errors.email}
                     error={!!errors.email}
                  />
                  <TextField
                     id="password"
                     name="password"
                     type="password"
                     label="Password"
                     className={classes.textField}
                     value={this.state.password}
                     onChange={this.handleChange}
                     fullWidth
                     helperText={errors.password}
                     error={!!errors.password}
                  />
                  {!!errors.general && (
                     <Typography
                        variant="body1"
                        className={classes.customError}
                     >
                        {errors.general}
                     </Typography>
                  )}
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.button}
                     disabled={loading}
                  >
                     {loading ? (
                        <CircularProgress
                           size={30}
                           className={classes.progress}
                        />
                     ) : (
                        "Login"
                     )}
                  </Button>
                  <br />
                  <small>
                     Don't have an account? sign up{" "}
                     <Link to="/signup">here</Link>
                  </small>
               </form>
            </Grid>
            <Grid item sm />
         </Grid>
      );
   }
}

login.propTypes = {
   classes: PropTypes.object.isRequired,
   loginUser: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   user: state.user,
   UI: state.UI,
});

const mapActionsToProps = {
   loginUser,
};
export default connect(
   mapStateToProps,
   mapActionsToProps
)(withStyles(styles)(login));
