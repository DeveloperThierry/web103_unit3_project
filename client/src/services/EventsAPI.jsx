const getAllEvents = async () => {
    try {
        const response = await fetch('/api/events')
        return await response.json()
    } catch (error) {
        console.error('Error fetching all events:', error)
    }
}

const getEventsByLocation = async (locationId) => {
    try {
        const response = await fetch(`/api/events/${locationId}`)
        return await response.json()
    } catch (error) {
        console.error(`Error fetching events for location ${locationId}:`, error)
    }
}

export default { 
    getAllEvents, 
    getEventsByLocation 
}