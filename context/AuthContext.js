import { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { account } from "../lib/appwriteConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    // Check for existing session on app startup
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const currentSession = await account.getSession('current');
            setSession(currentSession);
            
            if (currentSession) {
                const currentUser = await account.get();
                setUser(currentUser);
            }
        } catch (error) {
            console.log('No active session:', error.message);
            setSession(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signin = async ({ email, password }) => {
        setLoading(true);
        try {
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
            return { success: true };
        } catch (error) {
            console.log('Sign in error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signout = async () => {
        try {
            await account.deleteSession('current');
            setSession(null);
            setUser(null);
        } catch (error) {
            console.log('Sign out error:', error);
        }
    };

    const contextData = { 
        session, 
        user, 
        signin, 
        signout, 
        loading,
        isAuthenticated: !!session 
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </SafeAreaView>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };

