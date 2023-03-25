import { getDoc } from "firebase/firestore";
import api from "../_common/api";

const orgApi = (db) => {

  const { getByIdSub, createDoc, getDocsSub, getById, set } = api(db, "orgs");
  const create = async (name, userId, isTrial) => {
    const newOrg = {
      name,
      users: [userId],
      type: (isTrial ? "trial" : "prod")
    }
    const docRef = await createDoc(newOrg, userId);
    return await getDoc(docRef);

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
      if(doc.data().users.filter(x=>x.userId === userId))
      {
        callback(true);
      }
      else
        callback(false);
    })
  }

  const getUserRolesInOrgSub = (id, userId, callback) =>{
    return getByIdSub(id, doc => {
      if(doc.data().users.filter(x=>x.userId === userId))
      {
        const roles = doc.data().users.filter(u=>u.userId === userId)[0].roles
        callback(roles);
      }
      else
        callback(null);
    })
  }

  const getOrgByIdSub = (id, userId, callback) => {
    return getByIdSub(id, doc => getUserInOrgSub(id, userId, result => result === true && callback(doc))
    )
  }
  const getOriginCoords = (id, callback) => {
    return getByIdSub(id, callback)
  }

  const addUser = async (id, userId, roles) => {
    const org = await getById(id);
    const updatedOrg = org.data();
    updatedOrg.users = [...updatedOrg.users, {userId, roles}];
    await set(id, updatedOrg);
  }

  return { create, getForUserSub, getOrgByIdSub, getUserInOrgSub, getOriginCoords, addUser,getUserRolesInOrgSub };
}
export default orgApi;