import mongoose from 'mongoose';

// An interface that describes the prop to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

//An interface that describes the props that the User model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the props that a User Document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };
