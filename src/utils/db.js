import { getDocs, addDoc } from "firebase/firestore";

// CREATE USER
const createUser = async ({ collectionRef, data }) => {
  await addDoc(collectionRef, { ...data });
  return true;
};

// READ USERS
const getUsers = async ({ collectionRef }) => {
  const data = await getDocs(collectionRef);
  const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return users;
};

//GET SINLE USER DATA
const getUser = async ({ collectionRef, id }) => {
  const data = getUsers({ collectionRef });
  const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return users;
};

// UPDATE USER => NO NEED AS OF NOW

// DELETE USER => NO NEED AS OF NOW

// CHECK IF USERNAME EXISTS
const isUniqueUsername = async ({ collectionRef, username }) => {
  const users = await getUsers({ collectionRef });

  const index = users.findIndex((user) => user.username === username);

  if (index !== -1) {
    return false;
  } else {
    return true;
  }
};

const exportData = {
  createUser,
  getUsers,
  isUniqueUsername,
};

export default exportData;
