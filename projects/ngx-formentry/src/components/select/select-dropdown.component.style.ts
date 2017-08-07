export const STYLE = `select-dropdown {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
select-dropdown * {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
select-dropdown > div {
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
}
select-dropdown > div .filter {
  padding: 3px;
  width: 100%;
}
select-dropdown > div .filter input {
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 4px;
  width: 100%;
}
select-dropdown > div .options {
  max-height: 200px;
  overflow-y: auto;
}
select-dropdown > div .options ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
select-dropdown > div .options ul li {
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
}
select-dropdown .selected {
  background-color: #e0e0e0;
}
select-dropdown .selected.highlighted {
  background-color: #2196F3;
  color: #fff;
}
select-dropdown .highlighted {
  background-color: #2196F3;
  color: #fff;
}
select-dropdown .disabled {
  background-color: #fff;
  color: #9e9e9e;
  cursor: default;
  pointer-events: none;
}`;
