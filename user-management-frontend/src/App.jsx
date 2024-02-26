import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table/Table";
import Table2 from "./components/Table/Table2";
import TableSelectedUser from "./components/TableSelectedUser/TableSelectedUser";

import UserModification from "./pages/UserModification";

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };
    // <div className="font-inter m-2">
    //     <Table2 onUserSelect={handleUserSelect} />
    //     <TableSelectedUser user={selectedUser} />
    // </div>
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/users/form" element={<UserModification />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
