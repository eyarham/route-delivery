import api from "../_common/api";

const stopsApi = (db) => {
  const { getByIdSub, createDoc, getDocsSub } = api(db, "stops");
  const create = async (readyTime, name, address) => {
    const newStop = {
      readyTime,
      status: "ready",
      name,
      address
    }
    return await createDoc(newStop);
  }
  const getReadySub = (orgId, callback) => {
    return getDocsSub(docs => {
      const orgDocs = docs.filter(d => d.data().orgId === orgId && d.data().status === "ready")
      callback(orgDocs);
    })
  }
  return { create, getReadySub, getByIdSub };
}
export default stopsApi;