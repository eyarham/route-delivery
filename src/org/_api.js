import api from "../_common/api";

const orgApi = (db) => {

  const { getByIdSub, createDoc, getDocsSub } = api(db, "orgs");
  const create = async (name, drivers, customers, userId) => {
    const id = crypto.randomUUID();
    const newOrg = {
      id,
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

  const getUserInOrgSub = (id, userId, callback) => {
    return getByIdSub(id, doc => {
      if (doc.data().users.indexOf(userId) > -1) {
        callback(true);
      }
      else
        callback(false);
    })

  }

  const getOrgByIdSub = (id, userId, callback) => {
    return getByIdSub(id, doc => getUserInOrgSub(id, userId, result => result === true && callback(doc))
    )
  }
  const getOriginCoords = (id, callback)=>{
    return getByIdSub(id, callback )
  }

  return { create, getForUserSub, getOrgByIdSub, getUserInOrgSub, getOriginCoords };
}
export default orgApi;