import { useState, useEffect } from 'react';
import { courseModules } from '@/lib/course-data';
import { loadProgressFromStorage, saveProgressToStorage, MockProgress } from '@/lib/mock-data';

export interface ProgressData {
  moduleId: string;
  completed: boolean;
  timeSpent: number;
  assessmentData?: any;
}

export function useProgress(userId: number | null) {
  const [progressData, setProgressData] = useState<Record<string, MockProgress>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load progress data from localStorage on component mount
  useEffect(() => {
    if (userId) {
      const loadedProgress = loadProgressFromStorage();
      setProgressData(loadedProgress);
      setIsLoading(false);
    }
  }, [userId]);

  // Convert progress object to array format for compatibility
  const progress = Object.values(progressData);

  const updateProgress = (moduleId: string, updates: Partial<MockProgress>) => {
    setIsUpdating(true);
    
    setProgressData(prev => {
      const updated = { 
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          ...updates,
          // If marking as completed, set completedAt date
          ...(updates.completed && { completedAt: new Date() })
        }
      };
      
      // Save to localStorage
      saveProgressToStorage(updated);
      
      setIsUpdating(false);
      return updated;
    });
  };

  const markModuleComplete = (moduleId: string, timeSpent: number = 0) => {
    const currentProgress = progressData[moduleId];
    const newCompletedState = !currentProgress?.completed; // Toggle completion state
    
    updateProgress(moduleId, {
      completed: newCompletedState,
      timeSpent: currentProgress?.timeSpent || timeSpent
    });
  };

  const updateTimeSpent = (moduleId: string, timeSpent: number) => {
    updateProgress(moduleId, { timeSpent });
  };

  const saveAssessmentData = (moduleId: string, assessmentData: any) => {
    updateProgress(moduleId, { assessmentData });
  };

  const getModuleProgress = (moduleId: string) => {
    return progressData[moduleId];
  };

  const getCompletedModules = () => {
    return Object.values(progressData)
      .filter(p => p.completed)
      .map(p => p.moduleId);
  };

  const getTotalProgress = () => {
    const completedCount = Object.values(progressData).filter(p => p.completed).length;
    const totalModules = courseModules.length;
    return Math.round((completedCount / totalModules) * 100);
  };

  return {
    progress,
    isLoading,
    markModuleComplete,
    updateTimeSpent,
    saveAssessmentData,
    getModuleProgress,
    getCompletedModules,
    getTotalProgress,
    isUpdating,
  };
}
