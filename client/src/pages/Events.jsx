import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css' 

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchAllEvents = async () => {
            const data = await EventsAPI.getAllEvents()
            setEvents(data)
        }
        fetchAllEvents()
    }, [])

    return (
        <div className='location-events'>
            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events found!</h2>
                }
            </main>
        </div>
    )
}

export default Events