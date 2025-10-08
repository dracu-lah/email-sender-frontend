export function fixQuillHtml(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const ols = tempDiv.querySelectorAll("ol");
  ols.forEach((ol) => {
    const isBullet = Array.from(ol.children).every(
      (li) => li.getAttribute("data-list") === "bullet",
    );
    if (isBullet) {
      const ul = document.createElement("ul");
      ul.innerHTML = ol.innerHTML;
      ol.replaceWith(ul);
    }
  });

  return tempDiv.innerHTML;
}
