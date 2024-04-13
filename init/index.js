require('dotenv').config();

// Create the connection to the database
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

const {rooms} = require('./data.js');

const initDB = async () => {

    await supabase
        .from("rooms")
        .delete()
        .then(({ data, error }) => {
            console.log(data)
        })

    await supabase
        .from("rooms")
        .insert(rooms)
        .then(({ data, error }) => {
            console.log(data)
        })
}
initDB();