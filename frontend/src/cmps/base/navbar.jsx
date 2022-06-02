import { NavLink } from 'react-router-dom'

// nav links svg icons
import {
    Logo,
    HomeIcon,
    HomeActiveIcon,
    SearchIcon,
    SearchActiveIcon,
    LibraryIcon,
    LibraryActiveIcon,
    CreatePlaylistsIcon,
    LikedSongsIcon
} from '../../services/img.import.service'

// memo (?)
export const Navbar = () => {

    return (
        <nav className="nav-container">
            <NavLink to="/music">
                <div className="logo-container">
                    <Logo className="logo-svg" />
                    <span className='brand-txt'>Melodify</span>
                </div>
            </NavLink>
            <ul className="nav-list">
                <li>
                    <nav>
                        <NavLink end to="/music">
                            <HomeIcon fill="#b3b3b3" />
                            <span>Home</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="search">
                            <SearchIcon fill="#b3b3b3" />
                            <span>Search</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="library"
                        >
                            <LibraryIcon fill="#b3b3b3" />
                            <span>Your Library</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav className="create-playlist-nav">
                        <NavLink end to="station">
                            <div className="create-playlist">
                                <CreatePlaylistsIcon fill="#000" />
                            </div>
                            <span>Create Playlist</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="station/liked">
                            <div className="liked-songs">
                                <LikedSongsIcon fill="#b3b3b3" />
                            </div>
                            <span>Liked Songs</span>
                        </NavLink>
                    </nav>
                </li>
            </ul>
            <br className="separation-line"></br>
        </nav>

    )
}