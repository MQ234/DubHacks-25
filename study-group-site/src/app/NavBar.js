

function NavBar(){
    return(
         <nav className="bg-purple-600 p-4 space-x-6">
            <div className="flex justify-end space-x-6 text-white font-medium">
                <><p><a href = "#" className="hover:underline">Homes</a></p>
                <p><a href = "#" className="hover:underline">Study Groups</a></p>
                <p><a href = "#" className="hover:underline">Documents</a></p>
                <p><a href = "#" className="hover:underline">AI</a></p>
                <p><a href = "#" className="hover:underline">Calender</a></p></>
                </div>
        </nav>
    );
}

export default NavBar