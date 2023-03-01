export const getOrders = () => {
  const dataRows = [
    {
      id: 1, timeReady: new Date("2/22/2023 18:12:00"),
      lastName: "Forest",
      coords: [-81.578608, 41.5222813]
    },
    {
      id: 2, timeReady: new Date("2/22/2023 10:33:00"),
      lastName: "Cain",
      coords: [-81.5593926, 41.5068079]
    },
    {
      id: 3, timeReady: new Date("2/23/2023 06:07:00"),
      lastName: "Cumberland",
      coords: [-81.5697606, 41.5123942]
    },
    {
      id: 4, timeReady: new Date("2/24/2023 17:24:00"),
      lastName: "Boyd",
      coords: [-81.5644634, 41.5365342]
    },
    {
      id: 5, timeReady: new Date("2/26/2023 09:30:00"),
      lastName: "Denison",
      coords: [-81.5319582, 41.5345663]
    },
  ];
  return dataRows
}

export const getOriginCoords = () => {
  return [-81.673584, 41.512393]
}
