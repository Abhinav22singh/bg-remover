import {Webhook} from "svix";
import userModel from "../models/userModel.js";
import connectDB from "../configs/mongodb.js";
//api controller function 
//http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {

    try {
        await connectDB();
        //create svix instance with clerk
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const {type, data} = req.body;

        switch(type){
            case "user.created": {
    console.log("Creating user with data:", data); // ← add this
    const userData = {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        photo: data.image_url

    };
    console.log("userData:", userData); // ← and this
    await userModel.create(userData);
    res.json({success: true})
    break;
}
            case "user.updated":{
                    const userData = {
                    email:data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo : data.image_url
                };
                await userModel.findOneAndUpdate({clerkId: data.id}, userData);
                res.json({})

                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId: data.id});
                res.json({})
                break;
            }
            default:{
                console.log("Unknown event type: ", type);
            }
                
        }

        



    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }

    
}

export {clerkWebhooks};