module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                
                firstName:{ type: String, require: true, unique: true, dropDups: true },
                lastName:{ type: String, require: true, unique: true, dropDups: true },
                email: { type: String, require: true },
                password: { type: String, require: true },
                contactNumber:{type:String},
                role: { type: String, default: "user" },
                isAdmin:Boolean,
                isLoggedIn:Boolean,
                isAuthenticated:Boolean,
                accessToken:String,
            },
            { timestamps: true }

        )
    );

    return User;
};