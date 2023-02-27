export const getOrders = () => {
  const dataRows = [
    {
      id: 1, timeReady: new Date("2/22/2023 18:12:00"),
      lastName: "Bishop",
      coords: [-81.577167,41.508132]
    },
    {
      id: 2, timeReady: new Date("2/22/2023 10:33:00"),
      lastName: "Smittens",
      coords: [-81.597167,41.511132]
    },
    {
      id: 3, timeReady: new Date("2/23/2023 06:07:00"),
      lastName: "Loggins",
      coords: [-81.577167,41.508132]
    },
    {
      id: 4, timeReady: new Date("2/24/2023 17:24:00"),
      lastName: "Standard",
      coords: [-81.577167,41.508132]
    },
    {
      id: 5, timeReady: new Date("2/26/2023 09:30:00"),
      lastName: "Choof",
      coords: [-81.577167,41.508132]
    },
  ];
  return dataRows
}

export const getOriginCoords = ()=>{
  return [-81.673584, 41.512393]
}
