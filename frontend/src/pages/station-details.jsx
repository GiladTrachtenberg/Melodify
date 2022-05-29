import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Search } from "../cmps/search"
import { SongList } from "../cmps/song-list"
import { Hero } from "../cmps/hero"
import { stationService } from "../services/station.service"
import { getActionSetStation } from "../store/actions/station.action"
import { cloudinaryService } from '../services/cloudinary-service'
import { BtnExit } from '../services/img.import.service'

// import image from '../assets/imgs/logo-background.png'


export const StationDetails = () => {
    const dispatch = useDispatch()
    const { stationId } = useParams()

    const navigate = useNavigate()
    const stationModule = useSelector(storeState => storeState.stationModule)


    const [isSearchOpen, setIsSearchOpen] = useState(true)

    const [songResults, setSongResults] = useState(null)
    const [station, setStation] = useState(null)
    const [description, setDescription] = useState(null)
    const [title, setTitle] = useState(null)


    useEffect(() => {
        // if(params.stationId) setIsSearchOpen(false)
        if (station) return
        loadStation()
    }, [])

    const loadStation = async () => {
        if (!stationId) {
            setStation(stationService.getEmptyStation())
            return
        }

        const station = await stationService.getById(stationId)
        if (!station) {
            navigate('/library')
            return
        }
        // TODO: show user an indication that playlist wasnt found
        setStation(station)
        setIsSearchOpen(false)
    }


    const onAddSong = async (song) => {
        console.log('adding song to station', song)
        const newStation = { ...station, songs: [...station.songs, song] }
        setStation(newStation)
        if (station?._id) {
            const savedStation = await stationService.save(newStation)
            if (station._id === stationModule.station._id) {
                dispatch(getActionSetStation(savedStation))
            }
        } else stationService.save(newStation)
    }

    const displaySongResults = (songs) => {
        setSongResults(songs)
    }
    //TODO: addd img first to local state and then when save button clicked save it to data base!!!
    const handleImgUpload = async (ev) => {
        try {
            const src = await cloudinaryService.uploadImg(ev)
            const newStation = { ...station, coverUrl: src }
            setStation(newStation)
            const savedStation = await stationService.save(newStation)
        } catch {
            console.log('could not upload image')
        }
    }

    const onSubmit = async () => {
        try {
            const newStation = { ...station, name: title, description }
            setStation(newStation)
            const savedStation = await stationService.save(newStation)

        } catch {
            console.log('could not save title and description')
        }
    }




    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details">
        <Hero onSubmit={onSubmit} station={station} handleImgUpload={handleImgUpload} setDescription={setDescription} setTitle={setTitle} />
        <SongList songs={station.songs} isSearchResults={false} onAddSong={null} station={station} />
        <div >
            {isSearchOpen ? <div className="flex space-between">
                <div className="search-container">
                    <h1>Let's find something for your playlist</h1>
                    <Search isInStationDetails={true} onSearchSongs={displaySongResults} />
                </div>
                <div onClick={() => setIsSearchOpen(false)}>
                    <BtnExit />
                </div>
            </div> :
                <span className="flex flex-end" onClick={() => {setIsSearchOpen(true)}}>FIND MORE</span>
            }

        </div>
        <div>{songResults &&
            <SongList songs={songResults} isSearchResults={true} onAddSong={onAddSong} />
        }</div>
    </section>
}