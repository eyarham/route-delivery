export const getDeliveries = () => {
  const dataRows = [
    {
      id: 1, startTime: new Date("2/27/2023 06:00:00"), assignedDriver: 'Bo',
      pickups: 5
    },
    {
      id: 2, startTime: new Date("3/06/2023 06:00:00"), assignedDriver: 'Sully',
      pickups: 6
    },
    {
      id: 3, startTime: new Date("3/13/2023 06:00:00"), assignedDriver: 'Starre',
      pickups: 3
    },
    {
      id: 4, startTime: new Date("3/20/2023 06:00:00"), assignedDriver: 'Bo',
      pickups: 7
    },
    {
      id: 5, startTime: new Date("3/27/2023 06:00:00"), assignedDriver: 'Starre',
      pickups: 5
    },
  ]
  return dataRows
}