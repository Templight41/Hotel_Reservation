const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

exports.deleteBooking = async (req, res) => {
    try {

        let dataFetched = [];
        
        await supabase
            .from("bookings")
            .select()
            .eq("orderid", req.params.orderid)
            .then(({ data, error }) => {
                dataFetched = data;
            })

        

        if(dataFetched.length == 0) return await res.status(404).json({status: "Booking not found"});
        if(dataFetched[0].email != req.email.email) return await res.status(403).json({status: "Unauthorized"});

        const { data, error } = await supabase
            .from("bookings")
            .delete()
            .eq("orderid", req.params.orderid)

            console.log(error)
        if(error != null) return res.status(500).json({status: "Internal server error"});

        return res.status(200).json({status: "Booking deleted successfully"});
    }
    catch(err) {
        console.log(err)
        res.status(500).json({status: "Internal server error"});
    }
}