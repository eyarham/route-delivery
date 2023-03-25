import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import api from "../_common/api";

const userApi = (db, auth) => {
  const { getCollection, set, getById, getByIdSub, createDoc, getDocsSub, updateField } = api(db, "users");

  const create = async (authId, displayName) => {
    var newUserData = {
      userId: authId,
      authId: authId,
      displayName,
      pronouns: ''
    };
    const docRef = await createDoc(newUserData);
    return await getDoc(docRef);
  }

  const getEmailName = email => {
    const emailNameLength = email.indexOf('@');
    return email.slice(0, emailNameLength);
  }

  const getAuthUserSub = callback => {
    const unsubUser = onAuthStateChanged(auth, user => {
      callback(user);
    })
    return unsubUser
  }

  const getCurrentAuthUser = () => {
    const user = auth.currentUser;
    if (user) {
      return user;
    }
  }
  const get = async () => {
    const user = getCurrentAuthUser();
    return await getByAuthId(user.uid);
  }

  const getCurrentSub = (callback) => {
    return getAuthUserSub(user => {
      if (user) {
        return getByAuthIdSub(user.uid, data => callback(data, user.email ));
      }
      else {
        return callback(null);
      }
    })
  }

  const getLoggedInUser = async () => {
    const authUser = getCurrentAuthUser();
    if (authUser) {
      const user = await getByAuthId(authUser.uid);
      return user;
    }
  }

  const getCurrentUserId = async () => {
    const authUser = getCurrentAuthUser();
    if (!authUser)
      return null;
    const user = await getByAuthId(authUser.uid);
    return user.id;
  }

  const getByAuthId = async (id) => {
    const q2 = query(getCollection(), where("userId", "==", id));
    const membershipQuerySnapshot = await getDocs(q2);
    if (membershipQuerySnapshot.empty) return await getDoc(create(id));
    return membershipQuerySnapshot.docs[0];
  }
  const getByAuthIdSub = (id, callback, onError) => {
    const q = query(getCollection(), where("userId", "==", id));
    // const membershipQuerySnapshot = await getDocs(q2);
    // if (membershipQuerySnapshot.empty) return await getDoc(create(id));
    //return membershipQuerySnapshot.docs[0];

    const unsub = onSnapshot(q, snapshot => {
      const user = snapshot.docs[0];
      callback(user);
    }, error => {
      onError(error)
    });
    return unsub;
  }


  const updateUserEmail = async (newEmail, pw) => {
    const user = get();
    if (pw !== "") {
      await signInWithEmailAndPassword(auth, user.email, pw);
    }
    try {
      await updateEmail(user, newEmail);
      return { valid: true };
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          return {
            valid: false, message: "Please enter a valid email address."
          }
        case 'auth/email-already-in-use':
          return {
            valid: false, message: "This email is already in use. \nIf you did not create an account with this email, please contact the site administrator."
          }
        case 'auth/requires-recent-login':
          return {
            valid: null
          }
        default:
          return {
            success: false, message: e.code
          }
      }
    }
  }

  const getUserName = async (userId) => {
    if (!userId) return;

    const user = await getById(userId);
    const userName = user.data().displayName
    return userName;

  }
  const getUserNameSub = (userId, callback) => {
    if (!userId) return;
    return getByIdSub(userId, (user) => {
      const userName = user.data() && user.data().displayName
      callback(userName);
    })

  }

  const getUserPronouns = async (userId) => {
    if (!userId) return;
    const user = await getById(userId);
    return user.data() && user.data().pronouns;
  }

  const setIsModerator = async (userId, isModerator) => {
    if (!userId) return;
    await updateField(userId, { isModerator })
  }

  const createAccount = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await create(userCredential.user.uid, getEmailName(email));

  }
  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const setActiveOrgId = async (userId, activeOrgId) => {
    await updateField(userId, { activeOrgId })
  }

  const setDashboard = async (userId, dashboard)=>{
    await updateField(userId, { dashboard })
  }

  return {
    create,
    get,
    getByIdSub,
    getCurrentSub,
    set,
    setActiveOrgId,
    updateUserEmail,
    getUserName,
    getCurrentUserId,
    getUserPronouns,
    getUserNameSub,
    getLoggedInUser,
    getByAuthIdSub,
    getById,
    getDocs,
    getDocsSub,
    setIsModerator,
    createAccount,
    signIn,
    setDashboard
  };

}

export default userApi;

