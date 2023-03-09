import api from "../_common/api";

const driversApi = db => {
  const { createDoc, updateField, getByOrgIdSub } = api(db, "drivers");
  const create = async (orgId, name, userId) => {
    const newDriver = { orgId, name, }
    return await createDoc(newDriver, userId)
  }
  const deleteDoc = async id => {
    return await updateField(id, { isDeleted: true });
  }
  return { create, getByOrgIdSub, deleteDoc }
}
export default driversApi;