// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Guest {
  name: string;
  phone?: string;
  rsvpStatus: 'confirmed' | 'declined' | 'pending';
  message?: string;
  respondedAt?: string;
}

interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
  error?: string;
}

// Guest API Service
export const guestService = {
  // Create new guest RSVP
  async createGuest(guestData: Partial<Guest>): Promise<ApiResponse<Guest>> {
    try {
      const response = await fetch(`${API_BASE_URL}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating guest:', error);
      throw error;
    }
  },

  // Get all guests
  async getAllGuests(): Promise<ApiResponse<Guest[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/guests`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching guests:', error);
      throw error;
    }
  },

  // Get guest by ID
  async getGuestById(id: string): Promise<ApiResponse<Guest>> {
    try {
      const response = await fetch(`${API_BASE_URL}/guests/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching guest:', error);
      throw error;
    }
  },

  // Update guest
  async updateGuest(id: string, guestData: Partial<Guest>): Promise<ApiResponse<Guest>> {
    try {
      const response = await fetch(`${API_BASE_URL}/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating guest:', error);
      throw error;
    }
  },

  // Delete guest
  async deleteGuest(id: string): Promise<ApiResponse<Guest>> {
    try {
      const response = await fetch(`${API_BASE_URL}/guests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting guest:', error);
      throw error;
    }
  },

  // Get RSVP statistics
  async getRsvpStats(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/guests/stats/rsvp`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching RSVP stats:', error);
      throw error;
    }
  },
};

// Health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
