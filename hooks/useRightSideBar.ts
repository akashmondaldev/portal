import { create } from 'zustand'

interface RightSideBarState {
    sideBar: boolean
    openSideBar: () => void
    closeSideBar: () => void
}

const useRightSideBar = create<RightSideBarState>((set) => ({
    sideBar: false,
    openSideBar: () => set({ sideBar: true }),
    closeSideBar: () => set({ sideBar: false }),
}))


export default useRightSideBar