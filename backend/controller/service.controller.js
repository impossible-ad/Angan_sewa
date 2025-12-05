import db from "../config/dbconnect.js";

export const addService = async (req, res) => {
    try {
        const { name, description, address } = req.body;
        console.log(req.body)

        if (!name || !description || !address) {
            return res.status(400).json({
                message: "please provide all required data"
            })
        };

        await db.execute("INSERT INTO services(name,description,address) VALUES(?,?,?)", [name, description, address]);
        return res.status(200).json({
            message: "New Service Added"
        });



    } catch (error) {
        console.log(" Service Failed to Add", error)
    }
}

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const [inputedId] = await db.execute("SELECT id FROM services where id=?", [id]);

        if (inputedId === 0) {
            return res.status(400).json({
                message: "no such service found"
            });
        }

        await db.execute("DELETE FROM services where id=?", [id]);
        return res.status(200).json({
            message: "Service succesfully Deleted"
        })



    } catch (error) {
        console.log(" Service Failed to delete")
    }
} 