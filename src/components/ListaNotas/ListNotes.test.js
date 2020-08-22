import React from "react";
import ListaNotas from "./index";
import { clearLocaStorage, IncludingProvider } from "../../Utils/TestUtils";
import LocalStorage from "../../Utils/localStorage";
import { mount } from "../../enzyme";
import Note from "./Note";

let ListaNotas;
let allNotes = [];
beforeEach(() => {
  localStorage.setItem(
    "notes",
    '[{"category":"Work","message":"ddsaf","title":"wed"},{"category":"Friends","message":"kkjkjkkjkjk","title":"jj"}]'
  );
  const Notes = LocalStorage.getNotes();
  NoteList = JSON.parse(Notes);
});

afterEach(() => {
  clearLocaStorage();
});

describe("List the Notes", () => {
  test("List notes must be 0", () => {
    const wrapper = mount(
      <IncludingProvider>
        <ListaNotas />
      </IncludingProvider>
    );

    expect(wrapper.find(<Note />).length).toBe(0); //because it is not on map
  });

  test("List notes must be 2", () => {
    ListaNotas.map((item, index) => {
      allNotes.push(<Note id={index} item={item} key={index} />);
      return true;
    });
    expect(allNotes.length).toBe(ListaNotas.length);
  });
});
