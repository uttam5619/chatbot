
import {app} from "../app.js";
import {connectDB} from "./db.config.js";
import {connectChromaDB} from "./chroma.config.js";

const startServer =()=>{
    const port = process.env.PORT || 5000;
    try{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        connectDB();
        connectChromaDB();
    }catch(error){
        console.error("Error occured while starting the server:", error);
        process.exit(1);    
    }
}

export default startServer;