import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [profilePageOpen, setProfilePageOpen] = useState(false)
    const [infoPageOpen, setInfoPageOpen] = useState(false)
    const [searchPageOpen, setSearchPageOpen] = useState(false)
    const [createGroupPageOpen, setCreateGroupPageOpen] = useState(false)
    const [addGroupMembersPageOpen, setAddGroupMembersPageOpen] = useState(false)
    return <DataContext.Provider value={{profilePageOpen,setProfilePageOpen,
    infoPageOpen,setInfoPageOpen,searchPageOpen,setSearchPageOpen
    ,addGroupMembersPageOpen,setAddGroupMembersPageOpen,
    createGroupPageOpen,setCreateGroupPageOpen}}>
        {children}
    </DataContext.Provider>
}