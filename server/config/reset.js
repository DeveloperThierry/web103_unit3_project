import { pool } from './database.js'
import './database.js' 

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            location_id INTEGER NOT NULL
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('Successfully created events table!')
    } catch (err) {
        console.error('Error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    const eventData = [
        {
            title: 'Neon Nights Concert',
            date: '2026-05-20',
            time: '19:00',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
            location_id: 1
        },
        {
            title: 'Midnight Jazz Session',
            date: '2026-06-15',
            time: '20:30',
            image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800',
            location_id: 2
        },
        {
            title: 'Community Tech Fair',
            date: '2026-07-10',
            time: '10:00',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
            location_id: 3
        }
    ]

    eventData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [
            event.title,
            event.date,
            event.time,
            event.image,
            event.location_id
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('Error inserting event', err)
                return
            }
            console.log(`${event.title} added successfully!`)
        })
    })
}

const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(5) NOT NULL,
            image TEXT NOT NULL
        );
    `
    try {
        await pool.query(createTableQuery)
        console.log('Successfully created locations table!')
    } catch (err) {
        console.error('Error creating locations table', err)
    }
}

const seedLocationsTable = async () => {
    await createLocationsTable()

    const locationData = [
        { 
            name: 'Echo Lounge', 
            address: '1323 N Stemmons Fwy', city: 'Dallas', state: 'TX', zip: '75207', 
            image: 'https://images.unsplash.com/photo-1574391884720-bbe3740057d3?auto=format&fit=crop&q=80&w=800' 
        },
        { 
            name: 'House of Blues', 
            address: '2200 N Lamar St', city: 'Dallas', state: 'TX', zip: '75202', 
            image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800' 
        },
        { 
            name: 'The Pavilion', 
            address: '300 W Las Colinas Blvd', city: 'Irving', state: 'TX', zip: '75039', 
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' 
        },
        { 
            name: 'American Airlines Center', 
            address: '2500 Victory Ave', city: 'Dallas', state: 'TX', zip: '75219', 
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' 
        }
    ]

    locationData.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)'
        }
        const values = [location.name, location.address, location.city, location.state, location.zip, location.image]

        pool.query(insertQuery, values)
    })
}


seedEventsTable()
seedLocationsTable()