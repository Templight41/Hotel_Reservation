const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

exports.profileData = async (req, res, next) => {
    await supabase
        .from("users")
        .select()
        .eq("email", req.email.email)
        .then(({ data, error }) => {

            req.locals = {
                name: data[0].name,
                email: data[0].email,
                type: data[0].type,
            }
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({status: "Internal server error"});
    })

    await supabase
        .from("bookings")
        .select()
        .eq("email", req.email.email)
        .then(({ data, error }) => {
            req.locals = {
                ...req.locals,
                bookings: [...data]
            };
            next();
    })
}