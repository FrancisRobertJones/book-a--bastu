import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/BookingService';
import { AuthRequest } from '../types/auth.types';
import { ApplicationError } from '../utils/errors';

@Service()
export class BookingController {
  constructor(private bookingService: BookingService) { }

  getAvailableSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { saunaId } = req.params;
      const date = req.query.date as string;

      if (!date) {
        throw new ApplicationError('Date is required', 400);
      }

      const availableSlots = await this.bookingService.getAvailableSlots(
        saunaId,
        new Date(date)
      );

      res.json(availableSlots);
    } catch (error) {
      next(error);
    }
  };

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.payload.sub;

      if (!userId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const { saunaId, startTime } = req.body;

      if (!saunaId || !startTime) {
        throw new ApplicationError('Missing required booking information', 400);
      }

      const booking = await this.bookingService.createBooking(
        userId,
        saunaId,
        new Date(startTime)
      );

      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  };

  cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.payload.sub;
      const { bookingId } = req.params;

      if (!userId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      await this.bookingService.cancelBooking(bookingId, userId);
      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      next(error);
    }
  };

  adminCancelBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId, userId } = req.params;

      await this.bookingService.cancelBookingAdmin(bookingId, userId);
      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      next(error);
    }
  };

  getUserBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.payload.sub;

      if (!userId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const bookings = await this.bookingService.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  getUserBookingsCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.auth?.payload.sub;
        const { saunaId } = req.params;

        if (!userId) {
            throw new ApplicationError('Unauthorized', 401);
        }

        if (!saunaId) {
            throw new ApplicationError('No sauna id provided', 400);
        }

        const bookingsCount = await this.bookingService.getUserBookingsCount(userId, saunaId);
        res.json({ count: bookingsCount });
    } catch (error) {
        next(error);
    }
}

  getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.payload.sub;
      const { bookingId } = req.params;

      if (!userId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const booking = await this.bookingService.getBooking(bookingId, userId);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  };

  getSaunaBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.payload.sub;
      const { saunaId } = req.params;
      const { date } = req.query;

      if (!userId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const bookings = await this.bookingService.getSaunaBookings(
        saunaId,
        userId,
        date ? new Date(date as string) : undefined
      );

      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  getAllSaunaBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.payload.sub;
      const { saunaId } = req.params;


      if (!userId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const bookings = await this.bookingService.getAllSaunaBookings(saunaId, userId);
      console.log("here are the bookings " + bookings)

      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  getSaunaUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const adminId = authReq.auth?.payload.sub;
      const { saunaId } = req.params;

      if (!adminId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const users = await this.bookingService.getSaunaUsers(saunaId, adminId);
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getSaunaUserFromBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      const adminId = authReq.auth?.payload.sub;
      const { bookingId } = req.params;

      if (!adminId) {
        throw new ApplicationError('Unauthorized', 401);
      }

      const user = await this.bookingService.getSaunaUserFromBooking(bookingId)
      console.log("this is the user in controller : " + user)
      return res.json(user);

    } catch (error) {
      next(error);
    }
  };
}