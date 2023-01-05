export function addOptions(data, target) {
  let options = "";
  data.forEach((element) => {
    options += `<option value="${element}" >${element}</option>`;
  });
  return target.insertAdjacentHTML("beforeend", options);
}

export function addOptionsWithConditions(data, target, option) {
  let options = "";

  data.forEach((element) => {
    options += `<option value="${element[option]}" >${element.name}</option>`;
  });
  return target.insertAdjacentHTML("beforeend", options);
}

export function addList(data, target, action) {
  let list = "";

  data.forEach((element) => {
    list += `<li class="dropdown-item bg-white text-center" data-action="${action}">${element}</li>`;
  });

  return target.insertAdjacentHTML("beforeend", list);
}
