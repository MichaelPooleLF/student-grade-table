class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }

  updateAverage(newAverage) {
    var averageGradeBadge = $("span.badge");
    averageGradeBadge.text(newAverage);
  }
}
