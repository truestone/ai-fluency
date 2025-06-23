import { courseModules } from './course-data';

// Mock user data
export const mockUser = {
  id: 1,
  username: 'demo_user',
  email: 'demo@example.com'
};

// Mock progress data structure
export interface MockProgress {
  moduleId: string;
  completed: boolean;
  timeSpent: number;
  completedAt: Date | null;
  assessmentData: any | null;
}

// Initialize empty progress data
export const getInitialProgressData = (): Record<string, MockProgress> => {
  const progress: Record<string, MockProgress> = {};
  
  // Create an entry for each module
  courseModules.forEach(module => {
    progress[module.id] = {
      moduleId: module.id,
      completed: false,
      timeSpent: 0,
      completedAt: null,
      assessmentData: null
    };
  });
  
  return progress;
};

// Load progress from localStorage
export const loadProgressFromStorage = (): Record<string, MockProgress> => {
  try {
    const savedProgress = localStorage.getItem('ai-course-progress-data');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      
      // Convert string dates back to Date objects
      Object.keys(parsed).forEach(key => {
        if (parsed[key].completedAt) {
          parsed[key].completedAt = new Date(parsed[key].completedAt);
        }
      });
      
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load progress data:', error);
  }
  
  return getInitialProgressData();
};

// Save progress to localStorage
export const saveProgressToStorage = (progress: Record<string, MockProgress>): void => {
  try {
    localStorage.setItem('ai-course-progress-data', JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress data:', error);
  }
};