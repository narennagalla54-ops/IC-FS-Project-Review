import React, { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  role: "student" | "citizen" | "admin";
  avatar?: string;
  mode?: "student" | "citizen";
}

interface Bookmark {
  id: number;
  type: "article" | "book" | "video";
  title: string;
  timestamp: number;
}

interface Feedback {
  id: string;
  itemId: number;
  type: "article" | "book" | "video";
  title: string;
  rating: number;
  comment: string;
  timestamp: number;
}

interface UserProgress {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: "student" | "citizen" | "admin";
  articlesCompleted: number;
  booksCompleted: number;
  videosCompleted: number;
  totalProgress: number;
  averageRating: number;
  lastActive: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  setUserMode: (mode: "student" | "citizen") => void;
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (itemId: number, type: string) => void;
  feedbacks: Feedback[];
  addFeedback: (feedback: Feedback) => void;
  getLearningPath: () => LearningPath;
  markItemAsViewed: (itemId: number, type: "article" | "book" | "video") => void;
  getAllUserProgress: () => UserProgress[];
  updateUserProgress: (progress: UserProgress) => void;
}

interface LearningPath {
  articlesCompleted: number;
  booksCompleted: number;
  videosCompleted: number;
  totalProgress: number;
  recentItems: Bookmark[];
  averageRating: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const savedFeedbacks = localStorage.getItem("feedbacks");
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  const [viewedItems, setViewedItems] = useState<string[]>(() => {
    const savedViewed = localStorage.getItem("viewedItems");
    return savedViewed ? JSON.parse(savedViewed) : [];
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setBookmarks([]);
    setFeedbacks([]);
    setViewedItems([]);
    localStorage.removeItem("bookmarks");
    localStorage.removeItem("feedbacks");
    localStorage.removeItem("viewedItems");
  };

  const updateProfile = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const addBookmark = (bookmark: Bookmark) => {
    const updated = [bookmark, ...bookmarks];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const removeBookmark = (itemId: number, type: string) => {
    const updated = bookmarks.filter(b => !(b.id === itemId && b.type === type));
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const addFeedback = (feedback: Feedback) => {
    const updated = [feedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
  };

  const markItemAsViewed = (itemId: number, type: "article" | "book" | "video") => {
    const key = `${type}-${itemId}`;
    if (!viewedItems.includes(key)) {
      const updated = [...viewedItems, key];
      setViewedItems(updated);
      localStorage.setItem("viewedItems", JSON.stringify(updated));
    }
  };

  const [userProgress, setUserProgress] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem("userProgress");
    return saved ? JSON.parse(saved) : [];
  });

  const getLearningPath = (): LearningPath => {
    const articlesCompleted = viewedItems.filter(v => v.startsWith("article-")).length;
    const booksCompleted = viewedItems.filter(v => v.startsWith("book-")).length;
    const videosCompleted = viewedItems.filter(v => v.startsWith("video-")).length;
    const totalProgress = Math.round(((articlesCompleted + booksCompleted + videosCompleted) / 30) * 100);
    
    const avgRating = feedbacks.length > 0 
      ? Math.round((feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length) * 10) / 10
      : 0;

    return {
      articlesCompleted,
      booksCompleted,
      videosCompleted,
      totalProgress: Math.min(totalProgress, 100),
      recentItems: bookmarks.slice(0, 5),
      averageRating: avgRating,
    };
  };

  const setUserMode = (mode: "student" | "citizen") => {
    if (user) {
      const updatedUser = { ...user, mode };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const getAllUserProgress = (): UserProgress[] => {
    return userProgress;
  };

  const updateUserProgress = (progress: UserProgress) => {
    const existing = userProgress.find(p => p.userId === progress.userId);
    let updated: UserProgress[];
    if (existing) {
      updated = userProgress.map(p => p.userId === progress.userId ? progress : p);
    } else {
      updated = [...userProgress, progress];
    }
    setUserProgress(updated);
    localStorage.setItem("userProgress", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
        setUserMode,
        bookmarks,
        addBookmark,
        removeBookmark,
        feedbacks,
        addFeedback,
        getLearningPath,
        markItemAsViewed,
        getAllUserProgress,
        updateUserProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
