import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { User } from '../models/User';

export const getAdminStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysOrders = await Order.countDocuments({ createdAt: { $gte: today } });
    const pendingOrders = await Order.countDocuments({ status: 'Placed' });
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // Monthly revenue logic (simple approach)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Aggregate revenue by day
    const revenueStats = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' }, createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: "$totalAmount" } } },
      { $sort: { _id: 1 } }
    ]);

    const stats = {
      todaysOrders,
      totalCustomers,
      pendingOrders,
      revenueStats
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};
