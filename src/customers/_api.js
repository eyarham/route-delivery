import api from "../_common/api";

const customersApi = (db) => {

  const { getByIdSub, createDoc, updateField, getByOrgIdSub,getById,  set, getDocsByFieldSub } = api(db, "customers");
  const create = async (name, address, coords, orgId, userId) => {

    const newCustomer = { name, address, orgId, coords }
    return await createDoc(newCustomer, userId)
  }

  const getCustomerByIdSub = (id, callback) => {
    return getByIdSub(id, doc => {
      callback(doc);
    })
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

  return { create, getByOrgIdSub, getCustomerByIdSub, deleteDoc, getByEmailSub, assignUser, set }
}
export default customersApi;