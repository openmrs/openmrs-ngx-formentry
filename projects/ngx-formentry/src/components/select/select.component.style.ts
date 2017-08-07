export const STYLE = `
ng-select {
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;
  width: 100%;
}
ng-select * {
  box-sizing: border-box;
  font-family: Sans-Serif;
}
ng-select > div {
  border: 1px solid #ddd;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  width: 100%;
}
ng-select > div.disabled {
  background-color: #eee;
  color: #aaa;
  cursor: default;
  pointer-events: none;
}
ng-select > div > div.single {
  display: flex;
  height: 30px;
  width: 100%;
}
ng-select > div > div.single > div.value,
ng-select > div > div.single > div.placeholder {
  flex: 1;
  line-height: 30px;
  overflow: hidden;
  padding: 0 10px;
  white-space: nowrap;
}
ng-select > div > div.single > div.placeholder {
  color: #a9a9a9;
}
ng-select > div > div.single > div.clear,
ng-select > div > div.single > div.toggle {
  color: #aaa;
  line-height: 30px;
  text-align: center;
  width: 30px;
}
ng-select > div > div.single > div.clear:hover,
ng-select > div > div.single > div.toggle:hover {
  background-color: #ececec;
}
ng-select > div > div.single > div.clear {
  font-size: 18px;
}
ng-select > div > div.single > div.toggle {
  font-size: 14px;
}
ng-select > div > div.multiple {
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  min-height: 30px;
  padding: 0 10px;
  width: 100%;
}
ng-select > div > div.multiple > div.option {
  background-color: #eee;
  border: 1px solid #aaa;
  border-radius: 4px;
  color: #333;
  cursor: default;
  display: inline-block;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 22px;
  margin: 3px 5px 3px 0;
  padding: 0 4px;
}
ng-select > div > div.multiple > div.option span.deselect-option {
  color: #aaa;
  cursor: pointer;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
ng-select > div > div.multiple > div.option span.deselect-option:hover {
  color: #555;
}
ng-select > div > div.multiple input {
  background-color: transparent;
  border: none;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
ng-select > div > div.multiple input:focus {
  outline: none;
}
`;
