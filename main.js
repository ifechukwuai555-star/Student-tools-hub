
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("tool-search");
  const toolCards = document.querySelectorAll(".tool-card");
  const noResults = document.getElementById("no-results");

  if (!searchInput || !toolCards.length) {
    return;
  }

  function searchTools() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleTools = 0;

    toolCards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const description =
        card.querySelector("p")?.textContent.toLowerCase() || "";
      const keywords = card.dataset.tool?.toLowerCase() || "";

      const matches =
        query === "" ||
        title.includes(query) ||
        description.includes(query) ||
        keywords.includes(query);

      card.hidden = !matches;

      if (matches) {
        visibleTools++;
      }
    });

    if (noResults) {
      noResults.hidden = visibleTools !== 0;
    }
  }

  searchInput.addEventListener("input", searchTools);

  searchTools();
});
