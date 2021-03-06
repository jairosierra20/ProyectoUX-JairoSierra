import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LocalStorage from "../../Utilidades/localStorage";
import { useStateValue } from "../../statemanagement";
import { useStyles } from "./styles";
import CustomSnackbar from "./Snackbar";

function CreateNote() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    id: 0, //almacena la fecha de la nota
    category: "",
    message: "",
    title: ""
  });
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  function handleChange(name, event) {
    setState({
      ...state,
      [name]: event.target.value,
      id: new Date().getTime()
    });
  }

  /**
   * Add notes inside of localStorage and context api
   **/
  function addToNotes() {
    //note book is not set, so set the Note in "Note" object
    if (state.notebook === "") {
      const allNodes = LocalStorage.getNotes();
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        setOpenSnackbar(false);
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.setNotes(JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject
        });
      } else {
        setOpenSnackbar(true);
      }
    } else {
      const allNodes = LocalStorage.getNotebooks(state.notebook);
      let allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      //set the note inside note book
      const rowExists = LocalStorage.rowExists(state);
      if (rowExists.length === 0) {
        setOpenSnackbar(false);
        if (allNodesObject.length === 0) {
          allNodesObject = [state];
        } else {
          allNodesObject.push(state);
        }
        LocalStorage.set(state.notebook, JSON.stringify(allNodesObject));
        dispatch({
          type: "newNote",
          notes: allNodesObject
        });
      } else {
        setOpenSnackbar(true);
      }
    }
  }

  /**
   * On component Did mount , send data from localStorage into context api
   **/
  React.useEffect(() => {
    let All;
    let NoteNextMonth = LocalStorage.getNotebooks("Next Month");

    NoteNextMonth = NoteNextMonth !== null ? JSON.parse(NoteNextMonth) : [];

    All = [...NoteNextMonth];
    if (All.length > 0) {
      dispatch({ type: "newNote", notes: All });
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Nueva Nota
      </Typography>

      <TextField
        id="outlined-textarea"
        label="Escribe el contenido de la nota"
        placeholder="Escribe la nota"
        multiline
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={e => handleChange("title", e)}
        rows={10}
        fullWidth
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-category-native-simple">
          Etiqueta
        </InputLabel>
        <Select
          native
          value={state.category}
          onChange={e => handleChange("category", e)}
          labelWidth={labelWidth}
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple"
          }}
        >
          <option value="" />
          <option value={"React"}>React</option>
          <option value={"Javascript"}>Javascript</option>
          <option value={"Bootstrap"}>Bootstrap</option>
          <option value={"Electron"}>Electron</option>
          <option value={"HTML"}>HTML</option>
          <option value={"Matematicas"}>Matematicas</option>
          <option value={"Programacion"}>Programacion</option>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={addToNotes}
      >
        Guardar
      </Button>
      <CustomSnackbar
        open={openSnackbar}
        setClose={() => setOpenSnackbar(false)}
      />
    </React.Fragment>
  );
}

export default CreateNote;
