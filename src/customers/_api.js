import api from "../_common/api";

const customersApi = (db) => {

  const { getByIdSub, createDoc, updateField, getByOrgIdSub } = api(db, "customers");
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

  return { create, getByOrgIdSub, getCustomerByIdSub, deleteDoc }
}
export default customersApi;