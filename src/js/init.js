import data from "../data.json";
import Table from "./classTable";
const table = new Table(document.getElementById("table"), data);
table.renderHeader();
table.setData();
table.sorting();
