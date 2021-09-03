const dateViewValueToLabel = ["daily", "monthly", "yearly", "all time"];

function dateViewLabelToValue(label) {
  return dateViewValueToLabel.indexOf(label);
}

export { dateViewValueToLabel, dateViewLabelToValue };
