import api from "../_common/api";

const driversApi = db => {
  const { createDoc, updateField, getById, getByOrgIdSub, set, getDocsByFieldSub } = api(db, "drivers");
  const create = async (orgId, name, userId) => {
    const newDriver = { orgId, name, }
    return await createDoc(newDriver, userId)
  }
  const deleteDoc = async id => {
    return await updateField(id, { isDeleted: true });
  }

  const getByEmailSub = (email, callback) => {
    return getDocsByFieldSub("email", email, callback);
  }


  const assignUser = async (driverId, userId) => {
    const driverData = await getById(driverId);
    await set(driverId, { ...driverData.data(), userId })
  }

  return { create, getByOrgIdSub, deleteDoc, set, getByEmailSub, assignUser }
}
export default driversApi;