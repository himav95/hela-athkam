const useDashboardLogics = () => {
    const getDashboardData = async () => {
        try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
        }
    };

    // Do some processing with the data if needed

    return { getDashboardData };
}

export default useDashboardLogics;