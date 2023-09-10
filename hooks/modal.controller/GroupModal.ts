import { create } from 'zustand';

interface GroupControllerStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useGroupController = create<GroupControllerStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

export default useGroupController;