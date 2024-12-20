import bcrypt from 'bcrypt';
import User, { IUser } from '../db/user.schema';
import { SignupUser } from '../interfaces/signup';

class UserService {
  async getUsers(): Promise<IUser[]> {
    return await User.find().sort({ _id: 1 });
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    console.log(`Fetching user by email: ${email}`);

    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email');
    }
  }

  async createUser(user: SignupUser): Promise<IUser> {
    const { name, password, email, interest } = user;

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      interest,
    });

    try {
      return await newUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(
    id: string,
    name: string,
    email: string
  ): Promise<IUser | null> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error('User not found');
      }

      return id;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
}

const userService = new UserService();
export default userService;
