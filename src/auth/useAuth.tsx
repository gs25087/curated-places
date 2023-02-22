// @ts-nocheck
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext, createContext, FunctionComponent } from 'react';

import 'firebase/auth';
import initFirebase from './initFirebase';
import { removeTokenCookies, setTokenCookies } from './tokenCookies';

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  loading: boolean;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
  logout: () => null,
  authenticated: false
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user: { getIdToken: () => string }) => {
      if (!user) {
        setUser(null);
        setLoading(false);

        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      setLoading(false);
      setTokenCookies(token);
    });
  }, []);

  const logout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
        removeTokenCookies();
      })
      .catch((error: { message: string | undefined }) => {
        throw new Error(error.message);
      });
  };

  useEffect(() => {
    const cancelAutheListener = firebase
      .auth()
      .onIdTokenChanged(async (user: { getIdToken: () => string }) => {
        if (!user) {
          setUser(null);
          setLoading(false);

          return;
        }
        const token = await user.getIdToken();
        setUser(user);
        setLoading(false);
        setTokenCookies(token);
      });

    return () => cancelAutheListener();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
