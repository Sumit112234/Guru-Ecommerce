import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  mobile: { type: Number, default: 0 },
  refresh_token: { type: String, default: "" },
  verify_email: { type: Boolean, default: false },
  last_login_date: { type: Date, default: "" },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  address_details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
 
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  forgot_password_otp: { type: String },
  forgot_password_expiry: { type: Date },
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
