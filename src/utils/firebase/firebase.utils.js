import {initializeApp} from 'firebase/app';

import {onAuthStateChanged,signOut,getAuth,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';

import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZpyDpg6N4p2YKt-0UMTThT1xXajtJUaw",
    authDomain: "crown-db-b0c56.firebaseapp.com",
    projectId: "crown-db-b0c56",
    storageBucket: "crown-db-b0c56.appspot.com",
    messagingSenderId: "905240338649",
    appId: "1:905240338649:web:0c873121a54bffee941ec8"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt:'select_account'
});

export const auth = getAuth();

export const db = getFirestore();

export const signInWithGooglePopUp = async () => await signInWithPopup(auth,provider);

export const createAuthUserWithEmailAndPassword = async (email,password) => {
 if(!email || !password) return;
 return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser = async () => await signOut(auth);

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  if(!userAuth) return;
  const docRef = doc(db,'users',userAuth.uid);

  const docSnapShot = await getDoc(docRef);

  if(!docSnapShot.exists())
  {
  const {displayName,email} = userAuth;
  const createdAt = new Date();
    try{
      await setDoc(docRef,{
         displayName,
         email,
         createdAt,
         ...additionalInformation
      })
    }catch(err){
      console.log(err.message)
    }
  }
  return docSnapShot;
};

export const addCollectionAndDocuments = async (collectionName,objectsToAdd) => {
  const collectionRef = collection(db,collectionName);
  const batch = writeBatch(db);

  objectsToAdd.map((object) => {
     const docRef = doc(collectionRef,object.title.toLowerCase());
     batch.set(docRef,object);
  });

  await batch.commit();
  console.log('done');
};

export const getCollectionAndDocuments =  async () => {
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categories = querySnapshot.docs.map((docSnapShot)=> docSnapShot.data());

  return categories;
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribe = onAuthStateChanged(auth,
    (userAuth) => {
      unsubscribe();
      resolve(userAuth)
    },
    reject  
    );
  })
}