// Services/requestService.js
// Service for handling requests related to craftmaker applications(join us page craftmaker requests)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class RequestService {

  // Submit craftmaker application (public access - no auth needed)
  async submitCraftmakerApplication(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/craftmaker-applications`, {
        method: 'POST',
        body: formData // FormData object for file upload
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting craftmaker application:', error);
      throw error;
    }
  }

  // Get craftmaker applications (admin only - with auth)
  async getCraftmakerApplications(filters = {}) {
    try {
      const token = localStorage.getItem('authToken');
      const queryParams = new URLSearchParams(filters);

      const response = await fetch(
        `${API_BASE_URL}/craftmaker-applications?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching craftmaker applications:', error);
      throw error;
    }
  }

  // Get single craftmaker application by ID (admin only)
  async getCraftmakerApplicationById(applicationId) {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/craftmaker-applications/${applicationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching craftmaker application:', error);
      throw error;
    }
  }

  // Update application status (admin only)
  async updateApplicationStatus(applicationId, status, adminNotes = '') {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/craftmaker-applications/${applicationId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status, adminNotes })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  }

  // Get application statistics (admin only)
  async getApplicationStats() {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_BASE_URL}/craftmaker-applications/stats`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching application stats:', error);
      throw error;
    }
  }
}

const requestService = new RequestService();
export default requestService;