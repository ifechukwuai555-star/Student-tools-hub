const search = document.querySelector("#tool-search");
const cards = [...document.querySelectorAll(".tool-card")];
const status = document.querySelector("#search-status");
const empty = document.querySelector("#no-results");

if (search) {
  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();

    let visible = 0;

    cards.forEach(card => {
      const searchableText =
        card.dataset.tool ||
        card.textContent.toLowerCase();

      const match =
        !query ||
        searchableText.toLowerCase().includes(query);

      card.hidden = !match;

      if (match) {
        visible++;
      }
    });

    if (query) {
      status.textContent =
        `${visible} tool${visible === 1 ? "" : "s"} found`;
    } else {
      status.textContent = "";
    }

    empty.hidden = visible !== 0;
  });
}
