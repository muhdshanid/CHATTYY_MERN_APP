import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [profilePageOpen, setProfilePageOpen] = useState(false);
  const [infoPageOpen, setInfoPageOpen] = useState(false);
  const [searchPageOpen, setSearchPageOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [createGroupPageOpen, setCreateGroupPageOpen] = useState(false);
  const [addGroupMembersPageOpen, setAddGroupMembersPageOpen] = useState(false);
  return (
    <DataContext.Provider
      value={{
        selectedUsers, 
        setSelectedUsers,
        groupMessages,
        setGroupMessages,
        selectedGroup,
        setSelectedGroup,
        messages,
        setMessages,
        profilePageOpen,
        setProfilePageOpen,
        infoPageOpen,
        setInfoPageOpen,
        searchPageOpen,
        setSearchPageOpen,
        addGroupMembersPageOpen,
        setAddGroupMembersPageOpen,
        createGroupPageOpen,
        setCreateGroupPageOpen,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
