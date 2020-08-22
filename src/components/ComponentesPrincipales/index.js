import React from "react";
import ListaNotas from "../ListaNotas";
import CrearNota from "../CrearNota";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { StateProvider, initialState, reducer } from "../../statemanagement";
import ModalBase from "../../Utilidades/Modal";
import ShowModal from "../../Utilidades/ShowModal";
import { useStyles } from "./styles";

function MainComponent() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <StateProvider initialState={initialState} reducer={reducer}>
            <React.Fragment>
              <ModalBase />
              <ShowModal />
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={5}>
                <ListaNotas />
              </Grid>
              <Grid item xs={5}>
                <CrearNota />
              </Grid>
            </React.Fragment>
          </StateProvider>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default MainComponent;
