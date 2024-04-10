
require('dotenv').config();
console.log(process.env.SUPABASE_DB_URL)
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

const { data, error } = supabase
    .from('rooms')
    .select()
    .eq('id', 'room1')
    .then(data => {
        roomData = data.data[0];
        console.log(roomData)
    })