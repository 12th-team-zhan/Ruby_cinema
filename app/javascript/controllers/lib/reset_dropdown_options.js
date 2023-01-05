export function resetOptions(target, text) {
  target.replaceChildren();
  let Option = `<option>${text}</option>`;
  target.insertAdjacentHTML("beforeend", Option);
  target.disabled = true;
}
