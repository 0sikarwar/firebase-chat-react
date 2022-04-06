import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  setDoc,
  doc,
  Timestamp,
  updateDoc,
  getDoc,
  collection,
  where,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { getAuthObj, getStoreObj, getDbObj } from "./initializeFirebaseApp";
import { ref, serverTimestamp, onValue, onDisconnect, set, get, child } from "firebase/database";

export function currentUserId (){ return getAuthObj().currentUser?.uid;}
const getUserDocRef = (id) => doc(getStoreObj(), "users", id);

export function syncStatus() {
  onAuthStateChanged(getAuthObj(), (user) => {
    if (user) {
      const uid = user.uid;
      updateStatus(uid);
    }
  });
  const updateStatus = (uid) => {
    const userStatusDatabaseRef = ref(getDbObj(), "/status/" + uid);
    const isOfflineForDatabase = {
      state: "offline",
      last_changed: serverTimestamp(),
    };
    const isOnlineForDatabase = {
      state: "online",
      last_changed: serverTimestamp(),
    };

    // const userStatusFirestoreRef = doc(store, "users", uid);
    // const isOfflineForFirestore = {
    //   state: "offline",
    //   last_changed: Timestamp.fromDate(new Date()),
    // };

    // const isOnlineForFirestore = {
    //   state: "online",
    //   last_changed: Timestamp.fromDate(new Date()),
    // };

    const connectedRef = ref(getDbObj(), ".info/connected");
    onValue(connectedRef, async function (snapshot) {
      if (snapshot.val() === false) {
        // await setDoc(userStatusFirestoreRef, isOfflineForFirestore, { merge: true });
        return;
      }
      onDisconnect(userStatusDatabaseRef)
        .set(isOfflineForDatabase)
        .then(async function () {
          set(userStatusDatabaseRef, isOnlineForDatabase);
          // await setDoc(userStatusFirestoreRef, isOnlineForFirestore, { merge: true });
        });
    });
  };
}

export function getUsers(setUsers) {
  const userCollectionRef = collection(getStoreObj(), "users");
  const q = query(userCollectionRef, where("uid", "!=", currentUserId()));
  return onSnapshot(q, (querySnapshot) => {
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setUsers(list);
  });
}

export async function registerUser(data) {
  const { email, password, ...rest } = data;
  if (!email || !password) console.error("Email & Password required to register a Firebase user");
  let errorInReg = false;
  let userObj = null;
  try {
    const res = await fetchSignInMethodsForEmail(getAuthObj(), email);
    if (res.length) return null;
    const resp = await createUserWithEmailAndPassword(getAuthObj(), email, password);
    userObj = {
      uid: resp.user.uid,
      email,
      ...rest,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true,
    };
    await setDoc(getUserDocRef(resp.user.uid), { ...userObj });
  } catch (error) {
    console.error("registerUser Firebase", error);
    errorInReg = true;
  }
  if (!errorInReg) return userObj;
  return null;
}

export async function loginUser(email, password) {
  if (!email || !password) console.error("Email & Password required to Login a Firebase user");
  if (getAuthObj().currentUser) return getAuthObj().currentUser;
  try {
    const resp = await signInWithEmailAndPassword(getAuthObj(), email, password);
    const userDocRef = getUserDocRef(resp.user.uid);
    await updateDoc(userDocRef, { isOnline: true });
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error("loginUser Firebase", error);
  }
  return null;
}

export async function signoutUser() {
  try {
    await updateDoc(getUserDocRef(currentUserId()), {
      isOnline: false,
    });
    await signOut(getAuthObj());
  } catch (error) {
    console.error("signoutUser Firebase", error);
  }
}

const getMsgId = (id2) => {
  const id1 = currentUserId();
  return id1 > id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
};

const getMsgRef = (id2) => {
  return collection(getStoreObj(), "messages", getMsgId(id2), "chat");
};

export async function saveMsg(text, selectedUid) {
  await addDoc(getMsgRef(selectedUid), {
    text,
    from: currentUserId(),
    to: selectedUid,
    createdAt: Timestamp.fromDate(new Date()),
  });
  await setDoc(doc(getStoreObj(), "lastMsg", getMsgId(selectedUid)), {
    text,
    from: currentUserId(),
    to: selectedUid,
    createdAt: Timestamp.fromDate(new Date()),
    unread: true,
  });
}

export function fetchMsgs(selectedUid, setMsgs) {
  const q = query(getMsgRef(selectedUid), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    let msgs = [];
    snapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setMsgs(msgs);
  });
}

export function fetchLastMsg(selectedUid, setLastMsg) {
  const lastMsgRef = doc(getStoreObj(), "lastMsg", getMsgId(selectedUid));
  return onSnapshot(lastMsgRef, (snapshot) => {
    setLastMsg(snapshot.data());
  });
}

export async function markReadLastMsg(selectedUid) {
  const msgId = getMsgId(selectedUid);
  const docSnap = await getDoc(doc(getStoreObj(), "lastMsg", msgId));
  if (docSnap.data() && docSnap.data().from !== currentUserId())
    await updateDoc(doc(getStoreObj(), "lastMsg", msgId), { unread: false });
}

export function fetchStatus(selectedUser, setStatus) {
  const userStatusDbRef = ref(getDbObj());
  get(child(userStatusDbRef, "/status/" + selectedUser.uid)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      setStatus(!selectedUser.isOnline || data.state === "offline" ? "offline" : "online");
    } else {
      console.log("No data available");
    }
  });
}
