import api from "../_common/api";

const customersApi = (db) => {

  const { getByIdSub, createDoc, getDocsSub, updateField } = api(db, "customers");
  const create = async (name, address, coords,orgId, userId) => {
    
    const newCustomer = { name, address, orgId, coords }
    return await createDoc(newCustomer, userId)
  }
  const getByOrgIdSub = (orgId, callback) => {
    return getDocsSub(docs => {
      const orgDocs = docs.filter(d => d.data().orgId === orgId && d.data().isDeleted !== true)
      callback(orgDocs);
    })
  }

  const getCustomerByIdSub = (id, callback) => {
    return getByIdSub(id, doc => {
      callback(doc);
    })
  }

  const deleteDoc = async id => {
    return await updateField(id, { isDeleted: true });
  }

  return { create, getByOrgIdSub, getCustomerByIdSub, deleteDoc}
}
export default customersApi;