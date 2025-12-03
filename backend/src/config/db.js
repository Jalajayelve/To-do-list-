import mongoose from "mongoose";

 export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://jalajayelve11_db_user:OnzcCegh4YTNiv6e@cluster0.ptkrljb.mongodb.net/notes_db?appName=Cluster0"
        );
        console.log("mongodb connected successfully");
    } catch (error) {
        console.error("error connecting mongodb",error);
        process.exit(1)//exit with failure
    }

    
}