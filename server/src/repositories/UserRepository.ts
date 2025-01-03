import { Service } from 'typedi';
import { User, IUser, UserDTO } from '../models/User';
import mongoose from 'mongoose';

@Service()
export class UserRepository {
    async findByAuth0Id(auth0Id: string): Promise<IUser | null> {
        return User.findOne({ auth0Id });
    }

    async findById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    async updateRole(auth0Id: string, role: 'admin' | 'user'): Promise<void> {
        const result = await User.updateOne(
            { auth0Id },
            { $set: { role } }
        );

        if (result.matchedCount === 0) {
            throw new Error('User not found');
        }
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async create(userData: UserDTO): Promise<IUser> {
        const user = new User(userData);
        return user.save();
    }

    async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUserByAuth0Id(auth0Id: string): Promise<boolean> {
        const user = await User.findOne({ auth0Id });
        
        if (!user) {
            throw new Error('User not found');
        }

        if (user.saunaAccess && user.saunaAccess.length > 0) {
            await User.findByIdAndUpdate(
                user._id,
                { $set: { saunaAccess: [] } }
            );
        }
        const result = await User.findOneAndDelete({ auth0Id });
        return result !== null;
    }

    async findBySaunaAccess(saunaId: string): Promise<IUser[]> {
        return User.find({
            saunaAccess: new mongoose.Types.ObjectId(saunaId)
        }).sort({ createdAt: -1 });
    }

    async removeSaunaAccessForAllUsers(saunaId: string): Promise<void> {
        await User.updateMany(
            { saunaAccess: saunaId },
            { $pull: { saunaAccess: saunaId } }
        );
    }

    async updateUsername(auth0Id: string, newName: string): Promise<IUser | null> {
        const capitalizedName = newName.charAt(0).toUpperCase() + newName.slice(1);
        
        const result = await User.findOneAndUpdate(
            { auth0Id },
            { $set: { name: capitalizedName } },
            { new: true }
        );
    
        if (!result) {
            throw new Error('User not found');
        }
    
        return result;
    }
}