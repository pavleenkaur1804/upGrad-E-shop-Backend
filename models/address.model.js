module.exports = mongoose => {
    const Address = mongoose.model(
        "address",
        mongoose.Schema(
            {
                name: { type: String, require: true },
                city: { type: String, require: true },
                state: { type: String, require: true },
                street: { type: String, require: true },
                contactNumber: { type: Number, require: true },
                landmark: String,
                zipCode: { type: Number, require: true },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: "user",
                }
            },

        )
    );

    return Address;
};