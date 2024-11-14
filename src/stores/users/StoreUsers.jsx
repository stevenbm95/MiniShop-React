import { create } from "zustand";
import { getUsersApi } from "../../api/usersApi";

const useStoreUsers = create((set) => ({
  users: [],
  loadUsers: async () => {
    const apiUsers = await getUsersApi();
    set({ users: apiUsers });
  },

  getUsers: () => set((state) => ({ users: state.users })),
  getUserById: async () => {
    const apiUsers = await getUsersApi();
    set({ users: apiUsers });
  },
  createUser: (user) => set((state) => {
    const newUser = {
      id: crypto.randomUUID(),
      ...user,
    };
    const newArray = [...state.users, newUser];
    set({ users: newArray });
    return {
      users: newArray,
    };
  }),
  updateUser: (userId, data) => set((state) => {
    const newArray = state.users.map((u) => {
      if (u.id === userId) {
        const updatedUser = {
          ...u,
          ...data,
        };
        return updatedUser;
      }
      return u;
    });
    set({ users: newArray });
    return {
      users: newArray,
    };
  }),
  deleteUser: (userId) => set((state) => {
    const newArray = state.users.filter((u) => u.id !== userId);
    set({ users: newArray });
    return {
      users: newArray,
    };
  }),
}))

export default useStoreUsers
