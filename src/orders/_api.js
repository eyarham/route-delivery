import api from "../_common/api";

const ordersApi = (db) => {

  const { getByIdSub, createDoc, getDocsSub, updateField } = api(db, "orders");
  const create = async (customer, userId, orgId) => {
    const newOrder = {
      customerId: customer.id, orgId: orgId,
      customer: customer, readyTime: new Date(),
      status: "ready"
    }
    return await createDoc(newOrder, userId)
  }

  const getReadySub = (orgId, callback) => {
    return getDocsSub(docs => {
      const readyOrgDocs = docs.filter(d => d.data().orgId === orgId && d.data().status === "ready");
      callback(readyOrgDocs);
    })
  }
  const complete = async id => {
    await updateField(id, { status: "complete" })
    await updateField(id, { completeDatetime: new Date() })
  }
  const cancel = async id => {
    await updateField(id, { isCanceled: true });
    await updateField(id, { canceledDateTime: new Date() });
    await updateField(id, { status: "canceled" });
  }

  return { create, getReadySub, complete, getByIdSub, cancel }
}
export default ordersApi;