import Mustache from "mustache";

export default class Table {
  constructor(element, data) {
    this.element = element;
    this.data = data;
  }

  renderHeader() {
    this.element.innerHTML = `<table>
        <tbody>
            <tr>
                <th><p>id</p></th>
                <th><p>title</p></th>
                <th><p>year</p></th>
                <th><p>imdb</p></th>
            </tr>
        </tbody>
    </table>`;
  }

  setData(data = this.data) {
    const template = `<tr class= "item" data-id = {{ id }} data-title = "{{ title }}" data-year = {{ year }} data-imdb = {{ imdb }}>
    <td>{{ id }}</td>
    <td>{{ title }}</td>
    <td>{{ year }}</td>
    <td>{{ imdb }}</td>
    </tr>
`;
    let innerHtml = "";
    for (const item of data) {
      const render = Mustache.render(template, {
        id: item.id,
        title: item.title,
        year: item.year,
        imdb: Number(item.imdb).toFixed(2),
      });
      innerHtml += render;
    }

    this.element
      .querySelector("tbody")
      .insertAdjacentHTML("beforeend", innerHtml);
  }

  sortData(sortingBy) {
    const items = Array.from(this.element.querySelectorAll(".item"));
    if (!isNaN(Number(items[0].dataset[sortingBy]))) {
      items.sort((a, b) => {
        return Number(a.dataset[sortingBy]) - Number(b.dataset[sortingBy]);
      });
    } else {
      const collator = new Intl.Collator();
      items.sort((a, b) => {
        return collator.compare(a.dataset[sortingBy], b.dataset[sortingBy]);
      });
    }
    let itemsDataset = [];
    for (const item of items) {
      itemsDataset.push(item.dataset);
    }
    return itemsDataset;
  }

  deleteData() {
    const items = Array.from(this.element.querySelectorAll(".item"));
    items.forEach((el) => el.remove());
  }

  sorting() {
    const keys = Object.keys(this.element.querySelector(".item").dataset);
    let i = 0;
    let max = keys.length;
    setInterval(() => {
      if (i !== max && i % 1 === 0) {
        const data = this.sortData(keys[i]);
        this.deleteData();
        this.setData(data);
        this.addArrowDown(keys[i]);
        i += 0.5;
      } else if (i !== max && i % 1 !== 0) {
        const data = this.sortData(keys[i]);
        this.deleteData();
        this.setData(data.reverse());
        this.addArrowUp();
        i += 0.5;
      } else {
        i = 0;
      }
    }, 2000);
  }

  addArrowDown(header) {
    const a = this.element.querySelector(".arrow-up");
    if (a) {
      a.classList.remove("arrow-up");
    }
    const array = Array.from(this.element.querySelectorAll("th > p"));
    array.find((el) => el.textContent === header).classList.add("arrow-down");
  }

  addArrowUp() {
    const a = this.element.querySelector(".arrow-down");
    a.classList.remove("arrow-down");
    a.classList.add("arrow-up");
  }
}
