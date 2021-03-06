import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LocalStorage from "../../Utilidades/localStorage";
import { useStateValue } from "../../statemanagement";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { useNoteStyles as useStyles } from "./styles";
import Checkbox from "@material-ui/core/Checkbox";

function Note(props) {
  const { item, row } = props;
  const { id, title, category } = item;
  const [checkbox, setCheckbox] = React.useState(false);
  const classes = useStyles();
  const [, dispatch] = useStateValue();

  function handleChangeCheckBox() {
    setCheckbox(!checkbox);
    props.setCheckbox(!checkbox, id);
  }

  function deleteNote() {
    const NoteBookOfTheNote = item.notebook;
    let getObjectsOfTheNoteBook = JSON.parse(
      LocalStorage.getNotebooks(NoteBookOfTheNote)
    );
    if (getObjectsOfTheNoteBook === null) {
      getObjectsOfTheNoteBook = JSON.parse(LocalStorage.getNotes());
    }

    let removeNote = getObjectsOfTheNoteBook.filter(
      note => note.id !== item.id
    );
    LocalStorage.rmNoteBook(
      NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote
    );
    LocalStorage.set(
      NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote,
      JSON.stringify(removeNote)
    );

    dispatch({ type: "newNote", notes: removeNote });
  }
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <div className={title}>
           {title}({category})
        </div>
      </Grid>
      <Divider variant="middle" />
      <Grid container>
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          className={classes.button}
        >
          <Button variant="outlined" color="secondary" onClick={deleteNote}>
            Eliminar
          </Button>
        </ButtonGroup>
      </Grid>
    </Paper>
  );
}

export default Note;
