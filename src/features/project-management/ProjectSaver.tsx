'use client';

import { useState } from 'react';
import { useStore } from '@/stores/projectStore';

export default function ProjectSaver() {
  const { projectData } = useStore();
  const [projectName, setProjectName] = useState('My Renovation Project');
  const [isSaving, setIsSaving] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const saveProject = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/projects/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: projectName,
          data: projectData
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setShareLink(`${window.location.origin}/project/${result.projectId}`);
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Save & Share Project</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <button
          onClick={saveProject}
          disabled={isSaving}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Project'}
        </button>
        
        {shareLink && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded">
            <p className="mb-2">Project saved successfully! Share this link:</p>
            <div className="flex">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 p-2 border rounded-l dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="bg-secondary text-white px-4 py-2 rounded-r"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}