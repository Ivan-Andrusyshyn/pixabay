import bcrypt from 'bcrypt';

import User from '../db/user.schema';

class UserService {
  async getUsers(): Promise<any[]> {
    return await User.find().sort({ _id: 1 });
  }

  async getUserById(id: string): Promise<typeof User | null> {
    return await User.findById(id);
  }

  async getUserByEmail(email: string): Promise<typeof User | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Failed to fetch user by email');
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    media: string
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      media,
    });
    return await newUser.save();
  }

  async updateUser(
    id: string,
    name: string,
    email: string
  ): Promise<typeof User | null> {
    return await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );
  }

  async deleteUser(id: string): Promise<string> {
    await User.findByIdAndDelete(id);
    return id;
  }
}

const userService = new UserService();
export default userService;
