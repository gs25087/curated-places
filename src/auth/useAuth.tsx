import { auth } from '@/auth/initFirebase';
import { SignUpFormData } from '@/pages/signup';
import firebase from 'firebase/app';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserInfo,
  User,
  updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { getDateString } from '@/lib/helpers';

interface newUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

/* interface AuthContextType {
  //@ts-ignore
  user: firebase.User | null;
  //@ts-ignore
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
} */

// @ts-nocheck
const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  //@ts-ignore
  const [user, setUser] = useState<newUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const callAPI = async (user: User, data: SignUpFormData) => {
    const res = await fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firebaseId: user.uid,
        email: user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: getDateString(user.metadata.creationTime),
        photoUrl: user.photoURL,
        databaseId: process.env.NEXT_PUBLIC_DATABASE_ID
      })
    });
    const json = await res.json();
  };

  const signup = async (data: SignUpFormData) => {
    try {
      // Create a new user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      // TODO callAPI(user, data);

      // TODO Update the user's display name and photo URL
      // await updateProfile(user, {
      //   displayName: data.firstName + ' ' + data.lastName,
      //   photoURL: 'https:www.dlsndgl.com' // cloudinary url
      // });

      // Return the created user
      return user;
    } catch (error) {
      // @ts-ignore
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authenticated: !!user }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
