import api from "../_common/api";

const messagesApi = db => {
  const { createDoc, updateField, getByOrgIdSub, set } = api(db, "messages");
  const create = async (orgId, name, userId) => {
    const newDriver = { orgId, name, }
    return await createDoc(newDriver, userId)
  }
  const deleteDoc = async id => {
    return await updateField(id, { isDeleted: true });
  }
  return { create, getByOrgIdSub, deleteDoc,set }
}
export default messagesApi;