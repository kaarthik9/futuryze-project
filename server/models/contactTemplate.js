import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  creator: String,
  email: String,
  phone: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const contactTemplate = mongoose.model("contactTemplate", contactSchema);

export default contactTemplate;
