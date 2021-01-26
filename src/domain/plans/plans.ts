enum Plan {
  TRADITIONAL = 1,
  FALEMAIS30 = 2,
  FALEMAIS60 = 3,
  FALEMAIS120 = 4
}

function getPlanDescription (index: number): string {
  switch (index) {
    case Plan.TRADITIONAL:
      return 'Tradicional'
    case Plan.FALEMAIS30:
      return 'FaleMais 30'
    case Plan.FALEMAIS60:
      return 'FaleMais 60'
    case Plan.FALEMAIS120:
      return 'FaleMais 120'
  }
}

export {
  Plan,
  getPlanDescription
}
