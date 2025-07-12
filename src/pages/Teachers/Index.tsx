
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';

const Index = () => {
  return (
    <Routes>
      <Route index element={<TeacherDashboard />} />
    </Routes>
  );
};

export default Index;
