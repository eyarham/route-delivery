import api from "../_common/api";

const routeApi = (db) => {
  const { getByIdSub, createDoc, getDocsSub } = api(db, "routes");
  const create = async (startTime, stops, driver, orgId) => {
    const newRoute = {
      startTime,
      stops,
      driver,
      stopsCount: stops.length,
      orgId
    }
    return await createDoc(newRoute);
  }
  const getUpcomingSub = (orgId, callback) => {
    return getDocsSub(docs => {
      const orgDocs = docs.filter(d => d.data().orgId === orgId)
      callback(orgDocs);
    })
  }
  return { create, getUpcomingSub, getByIdSub };
}
export default routeApi;