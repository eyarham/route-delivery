import api from "../_common/api";

const orgApi = (db) => {

  const { getByIdSub, createDoc, getDocsSub } = api(db, "orgs");
  const create = async (name, drivers, customers, userId) => {
    const newOrg = {
      name,
      drivers,
      customers,
      users: [userId]
    }
    return await createDoc(newOrg, userId);
  }

  const getForUserSub = (userId, callback) => {

    return getDocsSub(docs => {
      const userDocs = docs.filter(d => d.data().users.indexOf(userId) > -1);
      callback(userDocs);
    })
  }

  const getOrgByIdSub = (id, userId, callback) => {
    return getByIdSub(id, doc => {
      if (doc.data().users.indexOf(userId) > -1) {
        callback(doc);
      }
    })
  }

  return { create, getForUserSub, getOrgByIdSub };
}
export default orgApi;