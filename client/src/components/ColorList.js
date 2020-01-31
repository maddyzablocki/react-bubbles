import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    code: {hex: ''},
    color: '',
    id: Date.now()
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(() => {
      alert('Color has been updated!')
      axiosWithAuth()
      .get(`/api/colors`)
      .then(res => updateColors(res.data))
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(() => {
      alert('Color has been deleted!')
      axiosWithAuth()
      .get('/api/colors')
      .then(res => updateColors(res.data))
    })
    .catch(err => console.error(err))
  };

  const createColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/api/colors`, newColor)
    .then(() => {
      alert(`New color has been create!`)
      axiosWithAuth()
      .get(`/api/colors`)
      .then(res => updateColors(res.data))
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  };

  const newColorChange = e => {
    e.preventDefault();
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div className="colors-wrap">
      <h1>COLORS</h1>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <h4>Add a new color!</h4>
      <form className="new-color-form" onSubmit={createColor}>
        <input 
          type='text'
          name='color'
          value={newColor.color}
          onChange={newColorChange}
          placeholder='Color name'
        />
        <input 
          type='text'
          name='code'
          value={newColor.code.hex}
          onChange={e => setNewColor({
          ...newColor, code: {hex: e.target.value}
          })}
          placeholder='hex code'
        />
        <button type="submit">Add new color</button>
      </form>
    </div>
  );
};

export default ColorList;
